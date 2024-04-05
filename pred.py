import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import numpy as np

import sys
import json
import csv


# Data from backend to python
json_data = sys.stdin.read()
json_data = json.loads(json_data)
df = pd.DataFrame(json_data['days'])
print("All okay for now")


#Filtering data by not omitting columns and getting averages
json_data = df.to_json(orient='records', lines=True)
df_from_json = pd.read_json(json_data, orient='records', lines=True)
df_from_json.to_csv('./pred_data/Actual_weather_data.csv', index=False)

if 'datetime' in df_from_json.columns:
    df_from_json['datetime'] = pd.to_datetime(df_from_json['datetime'])
else:
    print("Column 'datetime' not found in DataFrame.")
    
print("All okay for now 2")


df_from_json['Year'] = df_from_json['datetime'].dt.year
df_from_json['Month'] = df_from_json['datetime'].dt.month


avg_values_df = df_from_json.groupby(['Year', 'Month'])[['temp','feelslike','dew','humidity','precip','precipprob','precipcover','windgust','windspeed','winddir','pressure','cloudcover']].mean().reset_index()
avg_values_df.columns = ['Year', 'Month','Avg_Temp', 'Avg_Feelslike', 'Avg_Dew', 'Avg_Humidity', 'Avg_Precipitation', 'Avg_Precipitation_Probability', 'Avg_Precipitation_Coverage', 'Avg_Wind_Gust', 'Avg_Wind_Speed', 'Avg_Wind_Direction', 'Avg_Pressure', 'Avg_Cloud_Cover']
# df_from_json.drop(['Avg_Visibility','Avg_Snowfall', 'Avg_Snow_Depth', 'Avg_Solar_Radiation', 'Avg_Solar_Energy', 'Avg_UV_Index'], axis=1)  # Drop the target variable column
avg_values_df.dropna(inplace=True)
avg_values_df.to_csv(f"./pred_data/pred_average_weather.csv", index=False)
year_details = avg_values_df["Year"]
month_details = avg_values_df["Month"]

print(year_details)
print(month_details)
print("All okay for now too")

# taining data
merged_data = pd.read_csv('./train_data/final_merged_data.csv')
X_train = merged_data.drop(['Cases','District','Year','Month','Avg_Visibility','Avg_Snowfall', 'Avg_Snow_Depth', 'Avg_Solar_Radiation', 'Avg_Solar_Energy', 'Avg_UV_Index'], axis=1)  # Drop the target variable column
y_train = merged_data['Cases']
X_test = avg_values_df.drop(['Year','Month'],axis=1)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_pred_r = np.round(y_pred)
print(y_pred)
print(y_pred_r)

print("All ok guys")



# Creating a DataFrame with the predicted values, year, and month details
predicted_data = pd.DataFrame({
    'Year': year_details,
    'Month': month_details,
    'Predicted_Cases': y_pred_r
})

merged_data_with_details = pd.merge(avg_values_df[['Year', 'Month']], predicted_data, on=['Year', 'Month'], how='inner')


# TODO: add data as 0 if month has no details

merged_data_with_details.to_csv('./pred_data/merged_predicted_data.csv', index=False)

merged_data_with_details.to_json('./pred_data/merged_predicted_data.json', orient='records')

print("Good man")
