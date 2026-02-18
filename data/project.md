# Projects — Ankit Sharma (Catalog)

This file contains projects in a consistent format for retrieval and interview-ready answers.

---

## Brain Tumor Detection System
Aliases: brain tumor, MRI tumor classifier, brain MRI classification

### One-liner
Multi-class MRI tumor classification with 96%+ accuracy using CNNs and transfer learning.

### Problem
Classify brain MRI images into tumor and no tumor.  

### What I built
- Image classification pipeline for brain MRI scans
- Transfer learning experiments (VGG16/ResNet50) + custom CNN baseline
- Preprocessing pipeline (resize, normalization, CLAHE enhancement)
- Flask web app for upload + prediction

### Tech stack
TensorFlow/Keras, OpenCV, Flask

### Data
- 3,000+ T1-weighted MRI scans with augmentation
- Brats2022 dataset

### Metrics
- Test Accuracy: 96%+
- Weighted F1: 0.94
- Class-wise precision: 0.95 (no_tumor), 0.93 (no tumor)

### Links
- GitHub: https://github.com/ankit1831/Brain-Tumor-Detection-System

### Interview talking points
- Why transfer learning helped and how augmentation improved generalization
- What mistakes caused overfitting and how you fixed them
- How you measured performance (confusion matrix/ROC) and validated results

---

## Gait Recognition System (CASIA-B)
Aliases: gait biometrics, CASIA-B, view-invariant gait, gait recognition

### One-liner
Biometric identification using walking patterns with same-view and cross-view evaluation.

### Problem
Recognize identities from gait sequences under cross-view and clothing variations.

### What I built
- Preprocessing pipeline for gait silhouettes/sequences
- Deep pipeline: CNN (spatial) → LSTM (temporal) → classifier
- Same-view vs cross-view evaluation setup
- using transfer learning model (Exception)

### Tech stack
PyTorch, OpenCV

### Data
- CASIA-B: 124 subjects × 11 angles × 3 clothing × 10 sequences

### Metrics (ongoing / reported)
- Using CNNs : 94% 
- Using Exception (Transfer Learning ): 98%+


### Links
- GitHub:https://github.com/ankit1831/GAIT-Based-Biometric-Recognition-System

### Interview talking points
- Why cross-view is harder and what features help robustness
- How you structure sequences and avoid leakage across splits
- Next improvements (view-invariant representation, metric learning)

---

## Groq-Powered LLM Chatbot
Aliases: Groq chatbot, LLM streaming chatbot, model-switching chatbot

### One-liner
Ultra-fast chatbot with model switching and streaming responses (targeting <300ms perceived latency).

### Problem
Provide a responsive multi-model chat experience with good UX.

### What I built
- Multi-model selection (Llama3, Mixtral, Gemma family)
- Streaming UI behavior + conversation history management
- Clear chat functionality and practical UX controls

### Tech stack
Python, Streamlit, Groq API

### Performance
- Optimized for low-latency streaming experience

### Links
- GitHub:https://github.com/ankit1831/LLM-using-Groq

### Interview talking points
- Latency: what makes streaming feel fast even when compute is heavy
- UX: model switching, history, safe defaults
- Tradeoffs: speed vs quality vs cost

---

## Heal-Bridge AI
Aliases: Heal-Bridge, health platform, symptom checker

### One-liner
Healthcare platform with AI symptom checker (live deployment).

### Problem
Help users with preliminary symptom analysis and streamline healthcare workflows.

### What I built
- Symptom analysis flow + preliminary health assessment

### AI components
- AI-powered health insights

### Tech stack
Python, Flask, Streamlit, Render hosting

### Status
- Live and actively maintained
- Planned: teleconsultation, EHR integration

### Links
- Live: https://heal-bridge-ai.onrender.com/
- GitHub:https://github.com/ankit1831/Heal-BridgeAI

### Interview talking points
- Product thinking: user flows, edge cases, privacy considerations
- Deployment learnings: monitoring, stability, iteration speed
- How you would validate medical AI safely (disclaimers, escalation, evaluation)

---

## Food Delivery Time Prediction
Aliases: food delivery ETA, delivery time regression, ETA prediction

### One-liner
ETA regression model for delivery platforms (RMSE: 5.2 minutes, R²: 0.87).

### Problem
Predict delivery time using operational + context features.

### What I built
- Feature-based regression pipeline
- Data preprocessing and feature engineering
- Exploratory Data Analysis (EDA) with insightful visualizations
- Implementation of multiple machine learning models
- Model evaluation and comparison
- Web interface for user-friendly predictions (Planned with Flask)
- Model comparison and selection (XGBoost, Random Forest, Linear Regression)
- Insights about drivers (weather/peak hours)

### Tech stack
Pandas, XGBoost, Featuretools,Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn

### Metrics
- XGBoost: RMSE 7.2 min, R² 0.87
- Random Forest: RMSE 5.5 min, R² 0.85
- Linear Regression: RMSE 6.1 min, R² 0.78

### Links
- Live:
- GitHub:https://github.com/ankit1831/Food_delivery_time_prediction

### Interview talking points
- Why Random Forest won, how you prevented leakage
- Feature engineering impact and error analysis
- Business interpretation of ETA errors

---

## Customer Churn Prediction (Explainable ML)
Aliases: churn model, telco churn, SHAP churn

### One-liner
Explainable churn classifier with SHAP; strong performance (AUC: 0.95).

### Problem
Predict which customers are likely to churn and explain the drivers.

### What I built
- Preprocessing pipeline 
- Ensemble approach: XGBoost + Logistic Regression + other regression  odels
- SHAP explainability to identify key churn drivers

### Tech stack
Scikit-learn, XGBoost, SHAP, Plotly

### Data
- 7,000+ customer records

### Metrics
- AUC-ROC: 0.95
- Accuracy: 93.2%
- Precision (churn): 0.91
- Recall (churn): 0.89
- F1 (churn): 0.90

### Links
- GitHub:https://github.com/ankit1831/Customer-Churn-Prediction

### Interview talking points
- Why explainability matters and how you used SHAP correctly
- Imbalanced data handling and metric choice
- How to operationalize churn predictions (thresholds, interventions)

---
