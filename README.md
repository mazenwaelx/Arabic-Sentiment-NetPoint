# 🏨 Arabic Sentiment AI Challenge — End-to-End Deep Learning Pipeline

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Keras](https://img.shields.io/badge/Keras-Deep%20Learning-red.svg?logo=keras&logoColor=white)](https://keras.io/)
[![Task](https://img.shields.io/badge/Task-NLP%20%7C%20Sentiment%20Analysis-green.svg)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)](https://github.com)

A comprehensive, production-grade Natural Language Processing (NLP) and Deep Learning pipeline implemented in [`Project.ipynb`](file:///d:/netpoint/Project.ipynb) for the **Arabic Sentiment AI Challenge**.

The project investigates, benchmarks, and ensembles various neural network architectures (from classical RNNs to Bidirectional recurrent models, self-attention mechanisms, Transformer encoders, and metadata-enriched representations) to classify Arabic hotel reviews into **Positive (1)** or **Negative (0)** sentiment.

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Dataset Characteristics](#-dataset-characteristics)
- [Arabic NLP Preprocessing Engine](#-arabic-nlp-preprocessing-engine)
- [Model Architectures & Methodology](#-model-architectures--methodology)
- [Architectural Benchmarks & Results](#-architectural-benchmarks--results)
- [Error Analysis & Qualitative Findings](#-error-analysis--qualitative-findings)
- [Ensemble & Submission Pipeline](#-ensemble--submission-pipeline)
- [Repository Structure](#-repository-structure)
- [Getting Started & Reproducibility](#-getting-started--reproducibility)
- [Technologies & Libraries Used](#-technologies--libraries-used)

---

## 🎯 Project Overview

Arabic sentiment analysis presents unique linguistic challenges, including intricate morphology, dialectal variance, diacritics (*Tashkeel*), elongation (*Tatweel*), and orthographic inconsistencies. 

This project delivers a rigorous, comparative study:
1. **Data Sanitization & Arabic Text Normalization**: Custom rule-based NLP cleaning tailored specifically to Arabic script nuances.
2. **Sequential & Attentive Modeling**: Progressive experimentation across multiple architectures to discover the optimal trade-off between parameter efficiency and contextual understanding.
3. **Multi-Modal Metadata Enrichment**: Merging structured contextual metadata (hotel name, user profile, room category, length of stay) with raw text reviews.
4. **Soft-Voting Ensemble Strategy**: Blending multi-architecture probabilistic outputs to minimize variance and boost generalization.

---

## 📊 Dataset Characteristics

The dataset consists of authentic Arabic hotel reviews with structured metadata:

| Split | Number of Samples | Features | Target |
| :--- | :--- | :--- | :--- |
| **Training Set (`train.csv`)** | **84,443** | `Review_ID`, `Hotel_Name`, `User_Type`, `Room_Type`, `Nights`, `Review` | `Sentiment` (0 / 1) |
| **Test Set (`test.csv`)** | **21,222** | `Review_ID`, `Hotel_Name`, `User_Type`, `Room_Type`, `Nights`, `Review` | *To Predict* |

### Class Distribution (Training)
- **Negative (`0`)**: `42,261` reviews (~50.05%)
- **Positive (`1`)**: `42,182` reviews (~49.95%)
- *Balanced dataset distribution minimizes bias towards majority classes.*

### Sequence Length Statistics
- **75th Percentile**: ~34 words
- **90th Percentile**: ~68 words
- **95th Percentile**: ~102 words
- **Max Sequence Length Selected**: `100` tokens (covering >95% of full context while keeping computation fast).

---

## 🧹 Arabic NLP Preprocessing Engine

The `clean_arabic_text` pipeline normalizes text to ensure uniform vocabulary mapping and eliminate lexical noise:

```
Raw Arabic Text
   │
   ├── 1. Diacritics Removal (Tashkeel: Fatha, Damma, Kasra, Tanween, Sukun, Shadda)
   ├── 2. Elongation Removal (Tatweel / Kashida: \u0640)
   ├── 3. Orthographic Normalization:
   │      • Alef forms: [إ, أ, آ, ا] ➔ 'ا'
   │      • Taa Marbuta: 'ة' ➔ 'ه'
   │      • Alif Maqsura: 'ى' ➔ 'ي'
   ├── 4. Repeated Character Reduction (e.g., "رااااائع" ➔ "راائع")
   ├── 5. Non-Arabic Character & Special Symbol Filtering
   └── 6. Whitespace Normalization & Boundary Padding
   │
Cleaned Arabic Text
```

---

## 🧠 Model Architectures & Methodology

All neural models are implemented in TensorFlow / Keras with adaptive `TextVectorization` and early stopping on validation accuracy.

### 1. Baseline: Vanilla RNN (`Vanilla_RNN`)
- **Layer Stack**: Input ➔ Embedding (Dim 128) ➔ SimpleRNN (64 units, ReLU) ➔ Dropout (0.3) ➔ Sigmoid.
- **Purpose**: Establishes the lower baseline and verifies vanishing gradient limitations on long sequences.

### 2. Bidirectional LSTM (`Bidirectional_LSTM`)
- **Layer Stack**: Input ➔ Masked Embedding (Dim 128) ➔ Bidirectional LSTM (64 units, Dropout 0.2) ➔ Dense (32, ReLU) ➔ Dropout (0.3) ➔ Sigmoid.
- **Key Feature**: Zero-masking support and bidirectional context tracking over sequence dependencies.

### 3. Bidirectional GRU (`Bidirectional_GRU`)
- **Layer Stack**: Input ➔ Masked Embedding (Dim 128) ➔ Bidirectional GRU (64 units, Dropout 0.2) ➔ Dense (32, ReLU) ➔ Dropout (0.3) ➔ Sigmoid.
- **Key Feature**: Faster training convergence with comparable representational capacity to LSTM.

### 4. BiLSTM with Multi-Head Self-Attention (`Bidirectional_LSTM_with_Attention`)
- **Layer Stack**: Input ➔ Embedding (Dim 128) ➔ BiLSTM (64 units, `return_sequences=True`) ➔ MultiHeadAttention (2 heads, key_dim=64) ➔ LayerNorm (Residual Connection) ➔ GlobalAveragePooling1D ➔ Dense (32, ReLU) ➔ Dropout (0.3) ➔ Sigmoid.
- **Key Feature**: Allows the network to focus on discriminative sentiment keywords across long reviews.

### 5. Transformer Encoder (`Transformer_Encoder`)
- **Layer Stack**: Input ➔ Embedding (Dim 128) ➔ MultiHeadAttention (4 heads) ➔ Residual + LayerNorm ➔ Feed-Forward Network (Dense 256 + Dense 128) ➔ Residual + LayerNorm ➔ GlobalAveragePooling1D ➔ Dense (32) ➔ Dropout (0.3) ➔ Sigmoid.
- **Key Feature**: Fully attention-driven non-recurrent sequence modeling.

### 6. Rich-Text Metadata Enriched BiGRU (`BiGRU_RichText`)
- **Feature Engineering**: Contextual metadata injection (`فندق {Hotel_Name} . نزيل {User_Type} . غرفة {Room_Type} . اقامة {Nights} . {cleaned_review}`).
- **Model**: Extended vocabulary (`30,000` tokens) + sequence length (`120`) with Bidirectional GRU architecture.

---

## 📈 Architectural Benchmarks & Results

Comparative evaluation on the **80/20 Stratified Validation Set** (16,889 validation samples):

| Architecture | Validation Accuracy | Validation Loss | Trainable Parameters | Convergence Speed |
| :--- | :---: | :---: | :---: | :---: |
| **Vanilla RNN** | `50.78%` | `0.6912` | 3,212,417 | Fast (~25s/epoch) |
| **Transformer Encoder** | `93.33%` | `0.1801` | 3,534,401 | Moderate (~128s/epoch) |
| **BiLSTM + Multi-Head Attention** | `94.49%` | `0.1529` | 3,369,025 | Moderate (~90s/epoch) |
| **Bidirectional GRU** | `94.74%` | `0.1427` | 3,278,657 | Fast (~75s/epoch) |
| **Bidirectional LSTM** | `94.94%` | `0.1414` | 3,302,977 | Fast (~80s/epoch) |
| **BiGRU (Rich-Text Metadata)** | **`94.98%`** | **`0.1405`** | 3,923,657 | Fast (~93s/epoch) |

### Key Takeaways:
- **Recurrent Bidirectionality** (BiLSTM & BiGRU) achieved strong performance (~94.9%) due to sequential gating in Arabic sentence structures.
- **Metadata Enrichment** provided an incremental boost, equipping the model with hotel- and guest-specific context.
- **Vanilla RNN** suffered from severe vanishing gradients, collapsing near chance performance.

---

## 🔍 Error Analysis & Qualitative Findings

A dedicated inspection of misclassified reviews revealed frequent real-world challenges in Arabic sentiment classification:

1. **Sarcasm & Mixed Sentiment**: Reviews expressing praise for the location but heavy criticism for cleanliness or pricing.
2. **Conditional Negation**: Complex Arabic phrasing (e.g., *"الفندق ممتاز لولا سوء الاستقبال"* — *The hotel is great if not for the poor reception*).
3. **Implicit Compliments vs. Complaints**: Very short reviews with ambiguous dialect expressions.

---

## 🚀 Ensemble & Submission Pipeline

Three submission artifacts are generated from the test set (`21,222` rows):

```
                        ┌──────────────────┐
                        │   Test Dataset   │
                        └────────┬─────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
 ┌───────▼────────┐      ┌───────▼────────┐      ┌───────▼────────┐
 │ Single Best    │      │ Weighted       │      │ Super Ensemble │
 │ Model (BiGRU)  │      │ 3-Way Blend    │      │ 4-Way Blend    │
 └───────┬────────┘      └───────┬────────┘      └───────┬────────┘
         │                       │                       │
 ┌───────▼──────────────┐┌───────▼──────────────┐┌───────▼──────────────┐
 │submission_best_gru   ││submission_ensemble_  ││submission_super_     │
 │.csv                  ││weighted.csv          ││ensemble.csv          │
 └──────────────────────┘└──────────────────────┘└──────────────────────┘
```

### Ensemble Formulas:
- **Weighted 3-Way Blend**:
  $$\text{Prob} = 0.45 \times P_{\text{BiGRU}} + 0.30 \times P_{\text{BiLSTM}} + 0.25 \times P_{\text{BiLSTM+Att}}$$
- **Super Ensemble 4-Way Blend**:
  $$\text{Prob} = 0.25 \times P_{\text{BiGRU}} + 0.25 \times P_{\text{BiLSTM}} + 0.25 \times P_{\text{BiLSTM+Att}} + 0.25 \times P_{\text{BiGRU-Rich}}$$

Decision Boundary: $\hat{y} = \mathbb{I}(\text{Prob} \ge 0.50)$

---

## 📁 Repository Structure

```text
├── arabic-sentiment-ai-challenge/
│   ├── train.csv                      # Training dataset (84,443 reviews with labels)
│   ├── test.csv                       # Test dataset (21,222 reviews)
│   └── sample_submission.csv          # Sample submission format
├── Project.ipynb                      # Complete experimental Jupyter notebook
├── submission_best_gru.csv            # Best single model test predictions
├── submission_ensemble_weighted.csv   # Weighted ensemble test predictions
├── submission_super_ensemble.csv      # 4-Model super ensemble test predictions
└── README.md                          # Project documentation
```

---

## 🛠 Getting Started & Reproducibility

### 1. Prerequisites & Environment Setup
Clone the repository and install the required dependencies:

```bash
# Optional: Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install required packages
pip install numpy pandas matplotlib seaborn scikit-learn tensorflow transformers
```

### 2. Running the Pipeline
Open and execute [`Project.ipynb`](file:///d:/netpoint/Project.ipynb) step-by-step:
```bash
jupyter notebook Project.ipynb
```

The notebook automatically:
1. Loads datasets from `arabic-sentiment-ai-challenge/`
2. Runs EDA and plots sequence distributions
3. Cleans and normalizes Arabic text
4. Builds, trains, and validates all 6 architectures
5. Generates the architectural comparison table and bar chart
6. Exports test prediction submission CSVs

---

## 🧰 Technologies & Libraries Used

- **Deep Learning**: [TensorFlow](https://www.tensorflow.org/), [Keras](https://keras.io/)
- **Data Manipulation**: [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
- **Evaluation & Preprocessing**: [Scikit-Learn](https://scikit-learn.org/)
- **Visualization**: [Matplotlib](https://matplotlib.org/), [Seaborn](https://seaborn.pydata.org/)
- **Text Processing**: Python Standard `re` (Regular Expressions), `TextVectorization`

---

## 📄 License & Attribution
Developed for the **Arabic Sentiment AI Challenge**. Built for research and educational purposes in Arabic Natural Language Processing and Deep Learning.
