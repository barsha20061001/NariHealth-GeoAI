import pandas as pd

df = pd.read_csv("../datasets/PCOS_data.csv")

print("Rows and columns:", df.shape)
print("\nColumns:")
print(df.columns.tolist())
print("\nFirst 5 rows:")
print(df.head())