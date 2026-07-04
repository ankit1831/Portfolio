# Skills — Ankit Sharma (Index)

This file is organized for fast retrieval: top skills first, then categories, with evidence mapping to projects.

---

## Top skills (most relevant for placements)

- Machine Learning (supervised/unsupervised, model selection, evaluation)
- Deep Learning (CNNs, transfer learning, optimization)
- Computer Vision (spatial segmentation, binary masking, preprocessing, OpenCV pipelines)
- NLP & Transformers (tokenization, embeddings, transformer basics)
- Generative AI / LLM apps (RAG , prompt engineering, chatbot UX)
- Python (ML stack, APIs, automation)
- Model evaluation (metrics, error analysis)
- Deployment basics (Flask/Streamlit apps, practical hosting)
- High-Dimensional Data Engineering (Sparse matrices, chunk-based processing)
- API Integration & Serverless Architecture (FastAPI, Hugging Face, Vercel Edge)
- Geospatial Analytics & Routing
- Agentic AI
- Edge AI & Real-Time Inference (PyTorch/TIMM deployment on local hardware)
- Multithreaded Architecture & Hardware Integration (OpenCV overrides, sensor hijacking)

## Evidence (skills → where used)

- Computer Vision + CNNs → Brain Tumor Detection
- Real-Time Computer Vision & Edge Inference → Edge Biometric Gait Recognition (YOLOv8, TIMM Xception, OpenCV)
- Multithreading & Hardware Overrides → Edge Biometric Gait Recognition (Decoupled background processing, 1080p sensor integration)
- LLM app building + UX → Heal Bridge AI, Groq-Powered LLM Chatbot
- Full product workflow → Medicy
- Regression + feature engineering → Food Delivery ETA
- Classification + explainability → Customer Churn (SHAP)
- Out-of-core ML training, Prompt-Chaining, & Geospatial Routing → Heal Bridge AI
- Vercel Edge UI + Hugging Face Serverless Backend - Heal Bridge Decoupled Full-Stack Architecture
- LangGraph State Machinery - Context-Aware Symptom Discovery & Dynamic Tie-Breaking Pipeline
- Groq LPU API Integration - Real-Time Multi-Model Translation & Report Synthesis Engine
- Debugging Training-Serving Skew → Edge Biometric Gait Recognition (Aligning live tensor geometry to training environments)

---

## Machine Learning

- Cross-validation, model comparison, hyperparameter tuning
- Feature engineering, handling imbalanced data , exploratory data analysis , data visualisation
- Metrics: accuracy, F1, AUC, RMSE, R²
- Hybrid AI-ML Architecture: Bridging non-deterministic LLMs with deterministic classical classifiers (Bernoulli Naive Bayes) for hallucination-free decision-making.
- Stateless Model Deployment

## Deep Learning

- ANNs, CNNs, transfer learning (VGG16/ResNet50)
- Regularization, augmentation, overfitting control , architecture
- PyTorch / TensorFlow-Keras usage

## Computer Vision

- Preprocessing: resize, normalization, CLAHE enhancement
- OpenCV pipelines and image-based model deployment

## Data Engineering

- ETL Pipeline Architecture: Extracting raw nested JSON dictionaries and transforming them into flattened, vectorized feature columns for ML ingestion.
- Out-of-Core Data Processing: Streaming massive datasets in chunks for memory-safe ML training without loading the full CSV into RAM.

## NLP & Transformers

- Tokenization, embeddings (Word2Vec/BERT-style)
- Transformers architecture basics and LLM application building
- Text-to-JSON Structuring
- Semantic Mapping

## Generative AI & LLMs

- RAG basics, prompt engineering
- Chatbots: model selection, streaming UX patterns
- Fine-tuning concepts (PEFT/LoRA) and evaluation awareness
- Prompt Chaining & System Prompt Engineering
- Ultra-low Latency Inference (Groq LPU integration)
- Multimodal Data Extraction

## AI Engineering

- LLM Orchestration & Routing: Designing multi-agent workflows where models pass structured data to one another (e.g., Scribe → Mapper → CMO).
- Structured Output Generation: Forcing LLMs to output strict, programmatic JSON schemas for seamless backend integration.
- Semantic Search & Embeddings: Utilizing Hugging Face vector embeddings and dot-product similarity to map unstructured user input to deterministic datasets.
- Multimodal AI Pipelines: Implementing Vision-Language Models (Gemini) for automated OCR and anomaly extraction in clinical documents.
- AI System Resilience: Engineering fallback mechanisms, dynamic model routing, and automated retries to handle API rate limits and 503 errors.

## Web / App development

- Frontend: HTML, CSS, JavaScript (async/await, DOM, responsive UI)
- Backend basics: Flask
- App frameworks: Streamlit
- FastAPI (Building high-performance, asynchronous REST API endpoints)
- Micro-Server Architectures: Bypassing browser hardware constraints via localized Flask APIs and asynchronous HTTP polling loops.

## Databases & CS fundamentals

- MySQL concepts: queries, joins, indexing, normalization
- OS + Networks fundamentals, DSA foundations, DBMS
- Multithreading & Concurrency: Decoupling I/O loops from compute threads to prevent main-thread blocking.
- I/O Memory Management: Automated garbage collection for real-time video buffering.

## Tools

- Git/GitHub, VS Code, Jupyter, Anaconda
- Linux command line basics
- Vercel Edge Networks, Hugging Face Spaces
- Ultralytics YOLOv8, TIMM (PyTorch Image Models), OpenCV, PIL

## AI Platform Engineering & MLOps

- Serverless Backend Hosting (Hugging Face Spaces): Deploying stateless, micro-containerized Python applications using FastAPI and Uvicorn for production-ready inference
- Orchestration Frameworks (LangChain / LangGraph): Designing complex, multi-turn agentic workflows using dynamic state tracking, conditional routing loops, and structured output parsing.
- Asynchronous Inference & Compute (Groq LPU): Integrating dedicated hardware acceleration engines via ultra-low latency LPUs to build fluid, token-streaming user experiences.
- Edge AI Deployment: Porting heavy PyTorch architectures to consumer hardware for zero-network-latency inference and privacy-first biometric processing.
- Model Diagnostics: Identifying and patching Training-Serving Skew (aspect ratio distortion, pixel interpolation blur, and normalization mismatches) in live production feeds.
