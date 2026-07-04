# Ankit Sharma — AI/ML & Software Engineering Portfolio

This document serves as the primary source of truth for Ankit's technical projects, optimized for RAG retrieval and interview-ready responses.

---

## 1. Heal Bridge | Autonomous AI Medical Triage System

**Aliases:** Heal Bridge, medical triage AI, dual-engine diagnostic system, hallucination-free AI, spatial hospital routing, sparse matrix ML pipeline.

### One-liner

Institutional-grade, serverless medical triage platform bridging deterministic Bernoulli Naive Bayes inference with generative LLM prompt-chaining to completely eliminate diagnostic hallucinations.

### Problem

Large Language Models (LLMs) are probabilistic engines designed to predict the next statistically likely word, which leads to dangerous medical hallucinations. A system was required that could converse empathetically with patients while ensuring the actual diagnostic decisions were anchored strictly in immutable, deterministic mathematics.

### System Architecture (The "Tri-Model" Approach)

I engineered a decoupled inference pipeline that isolates the "creativity" of the LLM to the UI layer, restricting the clinical decision-making entirely to a classical Machine Learning model.

- **Phase 1: The Scribe (Generative NLP & Vision Extraction):**
  Utilizing Llama-3 hosted on ultra-low latency Groq LPUs, the system acts strictly as a clinical receptionist. Through strict prompt-chaining, it strips conversational noise from user input and outputs a rigid JSON schema of symptoms. Additionally, a multimodal Vision API processes uploaded clinical documents to extract out-of-range metrics without manual data entry.
- **Phase 2: Data Engineering & Deterministic Math (The Core):**
  The unstructured text is mapped via a backend dictionary (`clinical_keywords.json`) to a massive 959-column high-dimensional sparse matrix. Using `np.int8` for memory optimization, the backend constructs a binary feature vector (1 for present, 0 for absent). This is fed into a **Bernoulli Naive Bayes** classifier—mathematically optimal for boolean sparsity—trained out-of-core (`partial_fit`) on 1M+ patient records. The model outputs discrete log-probabilities across 800+ diseases using a serialized `joblib` label encoder.
- **Phase 3: The CMO (Synthesis & Guardrails):**
  The mathematical prediction (e.g., "Appendicitis: 92%") is injected as a hidden payload back into Llama-3's context window. The LLM synthesizes this deterministic truth into an empathetic patient summary, a highly technical physician report, and assigns a strict severity tier (`RED`, `YELLOW`, `GREEN`).

### Geospatial Routing & Edge Engineering

To make the platform actionable for emergency ("RED") cases, I engineered a custom spatial intelligence and privacy-first rendering layer.

- **Geospatial Intelligence:** Integrates `Nominatim` for forward geocoding and the `Overpass API` to execute spatial joins, locating hospitals within a 25km radius. Utilizes the **Haversine formula** multiplied by a 1.45x road-tortuosity heuristic to accurately calculate real-world physical displacement to the nearest clinic.
- **3D Anatomical Raycasting:** Engineered an interactive 3D human body mapper using `Three.js`, allowing users to precisely pinpoint pain locations via mesh interaction.
- **Privacy-by-Design Rendering:** Bypassed heavy, insecure server-side PDF generation. Implemented a hidden DOM architecture that leverages the browser's native print engine to generate clinical reports on the client side, ensuring zero PHI data persistence.
- **Real-time Multilingual Support:** Implemented a concurrent REST translation endpoint utilizing Llama-3 to toggle highly formatted HTML clinical reports between English and Hindi (Devanagari) instantly, paired with the browser's Web Speech API for native TTS.

### Results & Deployment

- **Accuracy & Latency:** Successfully eliminated LLM medical hallucinations while maintaining sub-second conversational latency via Groq LPUs and FastAPI asynchronous routing.
- **Deployment Architecture:** Fully decoupled, stateless architecture. Frontend globally deployed on Vercel Edge Networks; Machine Learning inference and API orchestration hosted via serverless Hugging Face Spaces.

### Tech Stack & Data

- **AI/ML Stack:** Meta Llama-3 (Groq API), Scikit-Learn (BernoulliNB), Pandas, NumPy, Joblib.
- **Backend Infrastructure:** FastAPI, Uvicorn, Python, REST APIs, OverpassQL.
- **Frontend Ecosystem:** Vanilla JS, Three.js, HTML5/CSS3 (Dynamic Viewport Height `dvh`), `marked.js`.
- **GitHub:** [ankit1831/Heal-Bridge](https://github.com/ankit1831/Heal-Bridge)
- **Live App:** [https://healbridge-seven.vercel.app/](https://healbridge-seven.vercel.app/)

## 2. Brain Tumor Detection System

**Aliases:** brain tumor, MRI tumor classifier, brain MRI classification, medical imaging AI

### One-liner

High-precision multi-class MRI tumor classification achieving **96%+ accuracy** using CNNs and Transfer Learning.

### Problem

Rapid and accurate detection of brain tumors is critical for patient care, but analyzing complex medical data requires robust, automated diagnostic tools to assist radiologists and reduce human error.

### Approach

I engineered a comprehensive, dual-input diagnostic system. The core pipeline utilizes Custom CNNs and Transfer Learning architectures (VGG16/ResNet50) to process and classify uploaded MRI images into tumor or non-tumor categories. Complementing this, I built a structured Machine Learning pipeline designed to evaluate specific clinical feature inputs and predict tumor presence based on tabular data.

### Results & Deployment

- **Accuracy:** Achieved **96%+** on test data using CLAHE enhancement and careful image augmentation to prevent overfitting.
- **Deployment:** Unified Flask web application for real-time inference, allowing users to submit either MRI scans or clinical data.
- **Metrics:** Weighted F1: 0.94 | Precision: 0.95 (no_tumor).

### Tech Stack & Data

- **Stack:** TensorFlow/Keras, OpenCV, Flask, Python.
- **Data:** 3,000+ T1-weighted MRI scans (Brats2022 dataset) with custom augmentation.
- **GitHub:** [ankit1831/Brain-Tumor-Detection-System](https://github.com/ankit1831/Brain-Tumor-Detection-System)

---

## 3. Gait Recognition System (CASIA-B)

**Aliases:** gait biometrics, CASIA-B, view-invariant gait, walking pattern recognition

### One-liner

Long-term research initiative achieving **98% accuracy** in biometric identification via temporal walking dynamics.

### Problem

Traditional biometric systems fail when faces are obscured or captured from a distance. Gait recognition provides a non-intrusive alternative but introduces complexities regarding cross-view camera angles and clothing variations.

### Approach

I architected a deep learning pipeline to process silhouette sequences from the CASIA-B dataset. I utilized Transfer Learning (Xception) to extract robust spatial features, which were then fed into an LSTM network to model the temporal dynamics of the human walk.

### Results & Status

- **Peak Accuracy:** **98%** using the Xception + LSTM architecture.
- **Status:** Active, ongoing team research project currently focused on improving view-invariant representations and metric learning.
- **Learnings:** Deepened expertise in temporal sequence modeling and preventing data leakage across different camera angles.

### Tech Stack & Data

- **Stack:** PyTorch, OpenCV, Xception, LSTM.
- **Data:** CASIA-B (124 subjects, 11 angles, 3 clothing variations).
- **GitHub:** [ankit1831/GAIT-Based-Biometric-Recognition-System](https://github.com/ankit1831/GAIT-Based-Biometric-Recognition-System)

---

## 4. Groq-Powered LLM Chatbot

**Aliases:** Groq chatbot, LLM streaming, high-speed chatbot, LPU inference

### One-liner

Ultra-fast multi-model conversational agent with **<300ms perceived latency** via Groq LPU API.

### Problem

Traditional LLM interfaces often suffer from noticeable latency and lock users into a single architecture, creating a sluggish conversational experience.

### Approach

I engineered a high-speed interface allowing seamless mid-conversation switching between state-of-the-art open-weight models (**Llama 3, Mixtral, and Gemma**). I optimized the system for token streaming and robust session state management.

### Results & Deployment

- **Performance:** Achieved real-time streaming with sub-300ms latency.
- **UX:** Streamlit deployment with instant model swapping and persistent conversation history.
- **Learnings:** Highlighted the importance of engineering for streaming responses to drive user adoption in GenAI apps.

### Tech Stack & Links

- **Stack:** Python, Streamlit, Groq API (LPU Inference).
- **GitHub:** [ankit1831/LLM-using-Groq](https://github.com/ankit1831/LLM-using-Groq)

---

## 5. Medicy

**Aliases:** Medicy, healthcare platform, AI symptom checker, medical web app

### One-liner

Live, full-stack healthcare platform featuring an AI symptom checker and patient management.

### Approach

I architected an end-to-end platform that integrates an AI-powered symptom checker with practical services like appointment scheduling and secure prescription/record uploads. Built using a Python, Flask, and Streamlit stack.

### Results & Deployment

- **Status:** Fully operational and **deployed live on Render**.
- **Impact:** Demonstrates a scalable product architecture prepared for future teleconsultation and EHR integrations.
- **Learnings:** Shifted focus from pure modeling to product stability, user privacy, and clinical disclaimers.

### Links

- **Live Web App:** [https://heal-bridge-ai.onrender.com/](https://heal-bridge-ai.onrender.com/)
- **GitHub:** [ankit1831/Medicy](https://github.com/ankit1831/Medicy)

---

## 6. Food Delivery Time Prediction

**Aliases:** delivery ETA, delivery time regression, ETA prediction, XGBoost delivery

### One-liner

Robust ETA regression pipeline achieving an **RMSE of 5.2 minutes** and an R² of 0.87.

### Problem

Accurately predicting delivery times is critical for logistics; models must capture non-linear interactions between traffic, weather, and peak order volumes.

### Approach

I developed a regression pipeline featuring extensive EDA and advanced feature engineering (interaction terms and polynomial features). I compared several models, including Linear Regression and Random Forest, against XGBoost.

### Results & Deployment

- **Best Model:** XGBoost achieved **RMSE: 5.2 min** and **R²: 0.87**.
- **Impact:** Successfully isolated key drivers of delay, such as weather conditions and peak-hour logistics.
- **Learnings:** Reinforced the massive impact of high-quality feature engineering over raw algorithm choice.

### Tech Stack & Metrics

- **Stack:** Pandas, NumPy, XGBoost, Scikit-Learn, Matplotlib, Seaborn.
- **GitHub:** [ankit1831/Food_delivery_time_prediction](https://github.com/ankit1831/Food_delivery_time_prediction)

---

## 7. Customer Churn Prediction (Explainable ML)

**Aliases:** churn model, telco churn, SHAP churn, explainable AI, SMOTE churn

### One-liner

Explainable churn classifier (**AUC: 0.95**) using an ensemble of XGBoost and Logistic Regression with SHAP interpretability.

### Problem

Subscription businesses need to predict churn and understand the specific drivers to design effective retention strategies.

### Approach

I developed a classification pipeline handling class imbalance via **SMOTE**. I utilized an ensemble of XGBoost, Random Forest, and Logistic Regression, integrating **SHAP** (SHapley Additive exPlanations) for model transparency.

### Results & Deployment

- **Metrics:** AUC-ROC: 0.95 | Accuracy: 93.2% | Precision (churn): 0.91.
- **Impact:** Identified "Contract Type" and "Monthly Charges" as primary churn drivers, providing actionable insights for business stakeholders.
- **Learnings:** Highlighted the value of model interpretability for stakeholder buy-in in business contexts.

### Tech Stack & Links

- **Stack:** Scikit-learn, XGBoost, SHAP, Plotly, Pandas.
- **GitHub:** [ankit1831/Customer-Churn-Prediction](https://github.com/ankit1831/Customer-Churn-Prediction)

---

## 8. Student Performance Prediction

**Aliases:** student success forecasting, academic intervention AI

### One-liner

End-to-end pipeline forecasting academic outcomes based on socioeconomic and behavioral data.

### Approach

I engineered a preprocessing engine for categorical encoding and missing value imputation, feeding into Random Forest and XGBoost models to identify at-risk students based on demographic and study habits.

### Results

- **Outcome:** Identified study time and parental education as the most significant performance drivers.
- **Deployment:** User-friendly web interface designed for educator intervention.

### Tech Stack & Links

- **Stack:** Python, Scikit-Learn, Pandas, Flask.
- **GitHub:** [ankit1831/Student_performance_prediction](https://github.com/ankit1831/Student_performance_prediction)
