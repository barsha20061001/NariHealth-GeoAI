import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

df = pd.read_csv("../datasets/PCOS_data.csv")

# Remove useless columns
df = df.drop(columns=[
    "Sl. No",
    "Patient File No.",
    "Unnamed: 44"
], errors="ignore")

# Convert target to integer
df["PCOS (Y/N)"] = df["PCOS (Y/N)"].astype(int)

X = df.drop("PCOS (Y/N)", axis=1)
y = df["PCOS (Y/N)"]

# Remove unwanted characters and convert all features to numeric
X = X.replace(r"[^0-9.\-]", "", regex=True)
X = X.apply(pd.to_numeric, errors="coerce")

# Fill missing/invalid values
X = X.fillna(X.mean())

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, pred))

joblib.dump(model, "../ml-models/pcos_model/model.pkl")

print("PCOS model saved!")