# QA Seed — Ankit Sharma (2027 Batch, 3rd Year)

Tone: Formal, confident, technical. Use concise answers with evidence (metrics, design choices, tradeoffs).

---

## 30-second intros (role-tailored)

### Intro — ML Engineer (30s)

I’m Ankit Sharma, a final year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.80/10). I build end-to-end ML systems with measurable outcomes—most notably a brain MRI tumor classifier with **96%+ test accuracy** and a weighted F1 of 0.94—and I’ve deployed projects using Flask/Streamlit. I also worked as an AI Research Intern at CodingJr (Apr–Jul 2025) on GenAI/chatbots and evaluation pipelines. I’m looking for ML Engineer roles where I can combine strong fundamentals, disciplined evaluation, and practical deployment to ship reliable ML features.

### Intro — Data Scientist (30s)

I’m Ankit Sharma, a final year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.80/10). My strength is applying ML rigor to real problems: I compare models, choose metrics correctly, handle imbalanced data (e.g., SMOTE in churn), and translate results into actionable insights with explainability tools like SHAP (AUC 0.95 on churn). I’ve also shipped working apps and dashboards using Flask/Streamlit, and I’m targeting Data Scientist roles where I can deliver both strong predictive performance and clear business interpretation.

### Intro — Software Engineer (30s)

I’m Ankit Sharma, a final year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.80/10). I enjoy building software systems that integrate ML/AI into usable products—like deployed Flask/Streamlit applications and a portfolio chatbot backed by retrieval over structured project documentation. During my AI Research internship at CodingJr (Apr–Jul 2025), I worked on chatbot development and evaluation pipelines, which strengthened my ability to build, test, and iterate quickly. I’m targeting Software Engineer roles—especially AI-adjacent—where I can apply solid CS fundamentals and ship reliable, user-facing features.

### Intro — AI Engineer (30s)

I’m Ankit Sharma, a final year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.80/10) specializing in hybrid AI architectures. I build systems that bridge generative LLMs with deterministic ML models to eliminate hallucinations in high-stakes environments. Most recently, I architected Heal Bridge, a serverless medical triage platform that uses Llama-3 for semantic extraction and a Bernoulli Naive Bayes classifier for mathematically anchored diagnostics. I’m targeting AI Engineer roles where I can design robust, prompt-chained workflows and deploy multimodal, production-grade applications.

### Intro — Data Engineer (30s)

I’m Ankit Sharma, a final year B.Tech CSE student at VIT Bhopal (2027 batch; CGPA 8.80/10). I specialize in high-dimensional data processing and ETL pipelines for machine learning. For my latest architecture, Heal Bridge, I engineered out-of-core chunk processing to train on 1 Million+ clinical records without exceeding RAM limits, and optimized inference by mapping unstructured JSON data into np.int8 sparse matrices. I’m targeting Data Engineer roles where I can optimize data streaming, manage vector schemas, and build resilient infrastructure for AI/ML systems.

---

## Core intro

### Q1. Tell me about yourself.

I’m Ankit Sharma, a B.Tech Computer Science student at VIT Bhopal University (2027 batch, currently in 3rd year; CGPA 8.80/10). I focus on building end-to-end machine learning systems—from data preprocessing and model training to evaluation and deployment—across computer vision, predictive modeling, and practical GenAI applications. I’ve also worked as an AI Research Intern at CodingJr (Apr–Jul 2025), where I contributed to generative AI research, chatbot development, and evaluation pipelines.

### Q2. What roles are you targeting and why?

My priority is ML Engineer, followed by Data Scientist and AI Engineer. I enjoy the engineering side of ML: building reliable pipelines, improving model performance through disciplined evaluation, and converting prototypes into usable applications. My projects reflect that: measurable results (accuracy/AUC/RMSE), clear model comparisons, and deployment experience via Flask/Streamlit.

### Q3. What are your strongest technical areas?

- Computer Vision: CNNs, transfer learning, preprocessing pipelines (OpenCV).
- ML fundamentals: model selection, evaluation metrics, feature engineering, imbalanced-data handling.
- Deep Learning: training workflows, overfitting control (dropout, augmentation), and optimization.
- Deployment basics: Flask/Streamlit apps, practical hosting experience (Render/Vercel).
- Tools: TensorFlow/Keras, PyTorch, Git; AWS/Oracle Cloud exposure; currently deepening LangChain/RAG.

---

## Signature projects (deep dive)

### Q4. Walk me through your Heal Bridge project(signature project , best project ).

Heal Bridge is an institutional-grade, serverless medical triage platform. I designed it to solve the hallucination problem inherent in LLMs by completely decoupling natural language processing from diagnostic mathematics. It uses Llama-3 running on Groq LPUs to extract unstructured patient symptoms into a rigid JSON schema. This schema maps to a 959-column sparse matrix, which is evaluated by a classical Bernoulli Naive Bayes classifier trained on over 1 million vectorized records. The deterministic output is then synthesized back into a human-readable report by the LLM.

### Q5. How did you solve the issue of LLM hallucinations in medical diagnosis?

I implemented a "Tri-Model" architecture. LLMs are probabilistic—they predict the next statistically likely word—which is dangerous for clinical decisions. I restricted the LLM via prompt-chaining to act strictly as a semantic "Scribe." The actual clinical decision is executed by a deterministic mathematical model. By isolating the math from the language generation, I achieved zero-hallucination diagnostics while maintaining conversational empathy.

### Q6. Why did you choose Bernoulli Naive Bayes over models like XGBoost or Random Forest?

The clinical dataset relies on the discrete presence or absence of symptoms. Bernoulli Naive Bayes is mathematically optimal for boolean feature spaces. By mapping patient data to a high-dimensional sparse matrix and utilizing log-probability tensors, the model calculates precise probabilities across 800+ diseases simultaneously. Tree-based models often struggle with high-dimensional sparsity, making BernoulliNB the most robust and memory-efficient choice for serverless deployment.

### Q7. Explain the data engineering and inference pipeline behind the system.

Unstructured conversational text is parsed by the LLM into a structured schema. The backend performs semantic mapping against a clinical dictionary to trigger index flips on a NumPy zero-array of length 959. To ensure the backend doesn't crash during training or inference, I utilized np.int8 for memory downcasting and partial_fit for out-of-core chunk processing. This creates a highly memory-optimized, one-hot encoded feature vector.

### Q8. I see you integrated geospatial routing. How does the emergency hospital location work?

When the system predicts a "RED" severity diagnosis, it triggers a spatial intelligence pipeline. I use the Nominatim API for forward geocoding the user's location, then execute a spatial query via the Overpass API to locate medical facilities within a 25km radius. To determine the closest facility, I calculate the distance using the Haversine formula heuristic to account for real-world road-network tortuosity.

### Q9. How did you handle user data privacy and PHI (Protected Health Information)?

The backend operates with complete session amnesia; there is zero database persistence. For the clinical report generation, I bypassed insecure server-side PDF libraries. Instead, I engineered a hidden DOM architecture on the client side using html2pdf.js. This ensures the user's medical data is rendered into a PDF entirely within their local browser's native print engine, eliminating any risk of PHI interception.

## Deep Dive: Real-Time Edge Biometric Gait Recognition

### Q: Walk me through the architecture of your real-time Gait Recognition system.

**A:** I designed it as a decoupled, multithreaded edge pipeline to handle high-definition video without frame-blocking.

1. **Observation Layer:** I used OpenCV to hijack a 1080p smartphone sensor, passing the feed to a YOLOv8n model acting as a tripwire over a 60% Region of Interest (ROI).
2. **Buffer & Threading:** When triggered, it buffers 5 seconds of video and passes it to a background worker thread, instantly freeing the main camera thread.
3. **Segmentation:** The background thread uses YOLOv8-Seg to extract binary human silhouettes, cropping and standardizing them into strict 64x64 pixel matrices.
4. **Inference & UI:** A pre-loaded PyTorch Xception model processes the batch. A localized Flask API (`127.0.0.1:5001`) polls the results every 1000ms, displaying the biometric match with zero network latency.

### Q: What was the hardest engineering challenge you faced, and how did you solve it?

**A:** I encountered a severe case of **Training-Serving Skew**. The PyTorch model achieved excellent validation accuracy in the lab but failed miserably on the live 1080p camera feed.
By auditing the pipeline, I discovered a spatial geometry mismatch. My live YOLO script was cropping silhouettes at 64x64, but the live PyTorch `transforms` block was mathematically stretching them to 72x72 via pixel interpolation before inference. This artificial blur destroyed the exact stride angles the model relied on. I aligned the live tensor geometry back to exactly 64x64, which instantly restored the live feed's accuracy to match our lab metrics.

### Q: Why did you run this on local Edge hardware instead of just sending the video to a Cloud API?

**A:** Two reasons: Latency and Data Payload. I upgraded the camera to a 1080p sensor, which means the system is capturing over 2 million pixels per frame. Zipping and transmitting a 5-second buffer of 1080p video over standard HTTP protocols introduces massive network latency, completely ruining the "real-time" aspect of a security system. By porting the Xception model directly into the local RAM, I reduced network latency to exactly zero and eliminated the privacy concerns of sending raw biometric video over the internet.

### Q: How do you prevent a single glitchy frame or shadow from causing a false prediction?

**A:** I implemented a **Majority Vote Algorithm** over a temporal batch. A 5-second walk generates roughly 10 to 15 viable silhouette frames. Instead of trusting a single frame, the pipeline pushes the entire batch through the Xception model. It aggregates the class ID predictions across all 10 authorized subjects, selects the most frequent prediction, and averages its softmax probabilities. If the averaged confidence is below a strict 0.70 threshold, it rejects it. This makes the system incredibly resilient to random lighting glitches or shadow artifacts.

### Q10. Walk me through your Brain Tumor Detection project.

Brain Tumor Detection is a multi-class MRI image classification system. I built both a custom CNN baseline and transfer learning variants (VGG16/ResNet50) with a preprocessing pipeline (resize, normalization, CLAHE enhancement). The best version achieved **96%+ test accuracy** and a weighted F1 of 0.94. I deployed it as a Flask web app for image upload and inference, which helped me think about usability and real-time inference constraints.

### Q11. What were the main challenges in Brain Tumor Detection, and how did you handle them?

Key challenges were generalization and avoiding overfitting. I used augmentation, regularization (dropout), and careful evaluation (confusion matrix and ROC curves) to ensure performance wasn’t inflated by easy patterns. I also used CLAHE to handle contrast variations in MRI scans, leading to the **96%+ accuracy** mark.

### Q12. Why did you use transfer learning (VGG16/ResNet50)?

MRI datasets can be limited compared to natural image datasets. Transfer learning provides robust feature extractors that help when labeled data is not huge. Fine-tuning allows adapting these features to the MRI domain while still benefiting from strong pretrained representations.

### Q13. Walk me through your Gait Recognition project.

Gait Recognition identifies individuals by walking patterns, which is challenging due to cross-view angles. I built a pipeline using **Xception** for spatial features and **LSTM** for temporal modeling. On the CASIA-B dataset, I achieved a peak accuracy of **98%**. This project is an ongoing research effort focusing on view-invariant robustness and temporal sequence modeling.

### Q14. Why is cross-view gait recognition hard?

Cross-view changes the visual appearance of the same person significantly, and clothing conditions further alter silhouettes. Models can overfit to view-specific cues. That’s why my evaluation separates same-view and cross-view performance to ensure the **98% accuracy** is robust.

### Q15. If you had more time, how would you improve Gait Recognition?

I would explore view-invariant representations, metric learning losses (contrastive/triplet), and stronger temporal modeling. I’d also strengthen the evaluation protocol and add error analysis by angle/clothing condition to see exactly where failures occur.

---

## ML fundamentals (interview standard)

### Q16. How do you choose the right metric?

It depends on the problem goal and class distribution. For balanced multi-class classification, accuracy and F1 are useful; for imbalanced binary classification, AUC-ROC, precision/recall, and F1 are more informative. For regression, RMSE and R² capture error magnitude and explained variance.

### Q17. How do you prevent data leakage?

I treat data splitting as part of the modeling design: define the unit of independence (e.g., patient-level for medical imaging), split before heavy transformations, and ensure preprocessing statistics are learned on the train set only. I also validate by checking for suspiciously high scores.

### Q18. How do you handle imbalanced data?

I combine: (1) correct metrics (F1/AUC), (2) class weights or sampling strategies like **SMOTE**, (3) threshold tuning, and (4) robust validation. In my churn project, SMOTE was critical to reaching an AUC of 0.95.

### Q19. How do you do error analysis?

I review confusion matrices, inspect misclassified examples, and look for systematic failure patterns. For regression, I inspect residuals vs. features and identify outliers to check if errors correlate with specific regimes like peak hours or weather.

---

## Additional projects (short pitch)

### Q20. Explain your Customer Churn project.

I built a churn classifier using an ensemble of **XGBoost and Logistic Regression**. I achieved an AUC-ROC of 0.95 and accuracy of 93.2%. I used SMOTE for imbalance and SHAP to identify that contract type and monthly charges were the top churn drivers, providing actionable insights for business stakeholders.

### Q21. Explain your Food Delivery Time Prediction project.

I developed a regression pipeline comparing XGBoost and Random Forest. XGBoost performed best with an **RMSE of 5.2 minutes** and an R² of 0.87. I focused on feature engineering (traffic, weather, distance) to justify the final model choice.

### Q22. Explain your Groq-powered chatbot project.

I built an ultra-fast streaming chatbot with model switching across Llama 3, Mixtral, and Gemma. The engineering focus was on **<300ms perceived latency** and UX, demonstrating my ability to integrate high-speed LLM APIs with Streamlit.

### Q23. Explain Medicy.

Medicy is a live healthcare platform featuring an AI symptom checker, appointment booking, and secure record uploads. It reflects product thinking and full-stack deployment (Flask/Streamlit/Render).

---

## RAG / GenAI

### Q24. What is RAG, and why use it?

RAG (Retrieval-Augmented Generation) retrieves relevant info from a knowledge base and injects it into the prompt. It reduces hallucinations and allows the assistant to answer questions strictly from my curated project documentation without retraining.

### Q25. Common failure modes in RAG and how you mitigate them?

- Weak retrieval: improve chunking and metadata.
- Poor context: add structure and source labels.
- Hallucination: strict instructions to answer only from context and provide citations.

### Q26. How would you evaluate a RAG bot?

I’d create a test set of recruiter questions and measure answer faithfulness (grounding) and retrieval precision (did the right doc get picked?).

---

## Behavioral (STAR-style)

### Q27. Describe a challenging problem you solved.

During the development of my medical triage platform, Heal Bridge, I faced a fundamental architectural conflict: I needed a system that could converse empathetically with patients while ensuring absolute clinical safety.

The challenge was that Large Language Models (LLMs) are inherently probabilistic engines—they predict the next statistically likely word, which frequently leads to hallucinations. In a high-stakes domain like medical triage, allowing a generative model to synthesize a diagnosis out of thin air is incredibly dangerous

To solve this, I engineered a decoupled, Tri-Model architecture that completely isolated the language generation layer from the diagnostic logic, establishing a Deterministic-to-Generative Bridge:

The Extraction Layer (Scribe): I restricted Llama-3 (running on low-latency Groq LPUs) via strict prompt-chaining to act solely as a semantic receptionist. Its only job was to parse unstructured patient text, voice, or clinical docs, stripping conversational noise to output a rigid JSON schema of symptoms.

The Data Pipeline & Deterministic Core (Judge): I engineered a backend mapping layer that took the JSON tokens and aligned them with a high-dimensional, 959-column sparse matrix. To make the pipeline memory-safe, I downcasted features to np.int8 integers. I then fed this vector into a classical Bernoulli Naive Bayes classifier trained out-of-core (partial_fit) on over 1 million records. The classifier calculated precise log-probabilities across 800+ diseases without any capacity to hallucinate.

The Synthesis Layer (CMO): I injected the hard mathematical array back into the LLM's context window, forcing it to translate the deterministic truth into an empathetic summary, clinical report, and severity rating (RED/YELLOW/GREEN).

### Q28. Describe a time you learned something quickly.

During my internship at CodingJr, I had to ramp up on transformer/GenAI concepts and convert them into working evaluation pipelines within weeks by building experiments and iterating on failures.

### Q29. Strengths and weaknesses?

Strengths: Disciplined evaluation, end-to-end pipeline thinking, and deployment capability. Weakness: Over-optimizing early; I’m improving this by timeboxing experiments.

### Q30. Why should we hire you?

You should hire me because I bridge the gap between rigorous machine learning theory and end-to-end, production-ready engineering. I don't just train models in notebooks; I build complete systems.
My technical foundation spans multiple domains, proven by measurable results:
Computer Vision & Deep Learning: I built a Brain Tumor Detection system achieving 96%+ accuracy and engineered a zero-latency Edge Biometric Gait Recognition pipeline, porting a PyTorch Xception model to consumer hardware to process 1080p video streams locally, completely bypassing cloud latency.  
 Explainable ML & Data Science: I developed a Customer Churn Predictor (AUC: 0.95) using SMOTE and SHAP to translate complex algorithms into actionable business insights.  
 Modern AI Engineering: I architect advanced, hybrid AI systems—orchestrating multimodal LLMs, agentic workflows, and prompt-chaining to solve real-world problems like generative hallucinations.  
 Ultimately, I bring the complete package: I can process high-dimensional data, train highly accurate classical or deep learning models, and deploy them to live, serverless edge environments. I am ready to bring this level of ownership and architectural discipline to your team's hardest problems.

---

## Quick “one-liners”

### Q31. Your tech stack in one line?

Python, TensorFlow/Keras, PyTorch, Flask/Streamlit, Scikit-Learn, OpenCV, and Git; actively working with LangChain and RAG.

### Q32. What makes you different?

I combine measurable ML performance with practical deployment: I can build models, evaluate them correctly, and present them as usable products for users or stakeholders.

### Q33. Tell me about a time your model failed in production.

**A:** My Gait Recognition model suffered from Training-Serving Skew. The live feed was being mathematically stretched from 64x64 to 72x72 by PyTorch transforms, blurring the silhouettes. I aligned the production preprocessing to the exact training geometry, instantly fixing the accuracy drop.

### Q34. How do you handle heavy AI processing on a live video feed without lagging?

**A:** Multithreaded decoupling. I keep the OpenCV camera on the main thread and push the YOLO segmentation and PyTorch inference to background worker threads, communicating state via a localized Flask API.
