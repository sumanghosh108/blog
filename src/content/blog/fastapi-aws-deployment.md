---
title: "Deploying FastAPI Applications on AWS: Complete Guide"
description: "Learn how to deploy production-ready FastAPI applications on AWS using Lambda, ECS, and EC2 with CI/CD pipelines, monitoring, and best practices"
publishDate: 2024-01-25
author: "Suman Ghosh"
tags: ["Python", "Cloud & AWS", "DevOps"]
image: "/images/fastapi-aws.jpg"
featured: false
draft: false
---

## Introduction

FastAPI has become the go-to framework for building high-performance Python APIs, offering automatic documentation, type validation, and async support out of the box. However, deploying FastAPI to production requires careful consideration of infrastructure, scalability, and operational concerns.

In this comprehensive guide, we'll explore three deployment strategies on AWS:

- **AWS Lambda + API Gateway**: Serverless, cost-effective for variable traffic
- **ECS Fargate**: Containerized, managed orchestration without server management
- **EC2 with Docker**: Full control, suitable for complex requirements

## Prerequisites

Before we begin, ensure you have:

- AWS account with appropriate permissions
- AWS CLI configured locally (`aws configure`)
- Docker installed (version 20.10+)
- Python 3.9+ installed
- Basic understanding of FastAPI and Python
- Familiarity with AWS services (Lambda, ECS, EC2)

## Sample FastAPI Application

Let's start with a simple FastAPI application that we'll deploy across different AWS services:

```python
# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="Task API",
    description="A simple task management API",
    version="1.0.0"
)

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False

# In-memory storage (use database in production)
tasks_db: List[Task] = []

@app.get("/")
async def root():
    return {"message": "Welcome to Task API", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return tasks_db

@app.post("/tasks", response_model=Task, status_code=201)
async def create_task(task: Task):
    tasks_db.append(task)
    return task

@app.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: int):
    for task in tasks_db:
        if task.id == task_id:
            return task
    raise HTTPException(status_code=404, detail="Task not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

Create a `requirements.txt` file:

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.3
mangum==0.17.0
```

## Deployment Strategy 1: AWS Lambda + API Gateway

### Why Lambda?

AWS Lambda is ideal for:
- Variable or unpredictable traffic patterns
- Cost optimization (pay per request)
- Zero server management
- Automatic scaling
- Quick deployments

### Step 1: Prepare FastAPI for Lambda

Lambda requires an adapter to handle API Gateway events. We'll use Mangum:

```python
# lambda_handler.py
from mangum import Mangum
from main import app

# Wrap FastAPI app with Mangum for Lambda compatibility
handler = Mangum(app, lifespan="off")
```

### Step 2: Create Deployment Package

Create a deployment script:

```bash
#!/bin/bash
# deploy_lambda.sh

# Create deployment package
mkdir -p lambda_package
pip install -r requirements.txt -t lambda_package/
cp main.py lambda_handler.py lambda_package/

# Create ZIP file
cd lambda_package
zip -r ../fastapi-lambda.zip .
cd ..

echo "Deployment package created: fastapi-lambda.zip"
```

### Step 3: Deploy with AWS SAM

Create a `template.yaml` for AWS SAM:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: FastAPI Lambda Deployment

Globals:
  Function:
    Timeout: 30
    MemorySize: 512
    Runtime: python3.11

Resources:
  FastAPIFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambda_package/
      Handler: lambda_handler.handler
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /{proxy+}
            Method: ANY
        RootEvent:
          Type: Api
          Properties:
            Path: /
            Method: ANY
      Environment:
        Variables:
          ENVIRONMENT: production

Outputs:
  ApiUrl:
    Description: "API Gateway endpoint URL"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/"
```

Deploy using SAM CLI:

```bash
# Build and deploy
sam build
sam deploy --guided

# For subsequent deployments
sam deploy
```

### Step 4: Alternative - Serverless Framework

Create `serverless.yml`:

```yaml
service: fastapi-lambda

provider:
  name: aws
  runtime: python3.11
  region: us-east-1
  memorySize: 512
  timeout: 30

functions:
  api:
    handler: lambda_handler.handler
    events:
      - http:
          path: /
          method: ANY
      - http:
          path: /{proxy+}
          method: ANY

plugins:
  - serverless-python-requirements

custom:
  pythonRequirements:
    dockerizePip: true
```

Deploy:

```bash
serverless deploy
```

### Lambda Optimization Tips

1. **Cold Start Optimization**:

```python
# Use provisioned concurrency for critical endpoints
# Configure in template.yaml
ProvisionedConcurrencyConfig:
  ProvisionedConcurrentExecutions: 2
```

2. **Environment Variables**:

```python
import os

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
```

3. **Lambda Layers for Dependencies**:

```bash
# Create layer for common dependencies
mkdir python
pip install -r requirements.txt -t python/
zip -r dependencies-layer.zip python/
```

## Deployment Strategy 2: ECS Fargate

### Why ECS Fargate?

ECS Fargate is ideal for:
- Containerized applications
- No server management
- Predictable pricing
- Integration with AWS services
- Long-running processes

### Step 1: Create Dockerfile

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY main.py .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Step 2: Build and Push to ECR

```bash
#!/bin/bash
# deploy_ecr.sh

# Variables
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPO_NAME="fastapi-app"
IMAGE_TAG="latest"

# Create ECR repository
aws ecr create-repository \
    --repository-name $ECR_REPO_NAME \
    --region $AWS_REGION \
    --image-scanning-configuration scanOnPush=true \
    || echo "Repository already exists"

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build image
docker build -t $ECR_REPO_NAME:$IMAGE_TAG .

# Tag image
docker tag $ECR_REPO_NAME:$IMAGE_TAG \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$IMAGE_TAG

# Push to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$IMAGE_TAG

echo "Image pushed successfully!"
```

### Step 3: Create ECS Task Definition

```json
{
  "family": "fastapi-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "fastapi-container",
      "image": "<AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/fastapi-app:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "environment": [
        {
          "name": "ENVIRONMENT",
          "value": "production"
        }
      ],
      "logConfig
