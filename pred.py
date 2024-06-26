import subprocess
import sys

# # Function to install packages using pip
# def install(package):
#     subprocess.check_call([sys.executable, "-m", "pip", "install", package], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, shell=True)


# # List of packages to install
# packages = ['pandas', 'scikit-learn', 'numpy']

# # Install each package
# for package in packages:
#     # print(f"Installing package: {package}")
#     install(package)
#     # print(f"Installed package: {package}")
    
# # print("\033[H\033[J")

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.impute import SimpleImputer
import numpy as np
import sys
import json
import csv
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import Ridge


# Data from backend to python
location = sys.argv[1]
json_data = sys.stdin.read()
json_data = json.loads(json_data)
df = pd.DataFrame(json_data['days'])
# print("All okay for now")


#Filtering data by not omitting columns and getting averages
json_data = df.to_json(orient='records', lines=True)
df_from_json = pd.read_json(json_data, orient='records', lines=True)
df_from_json.to_csv('./pred_data/Actual_weather_data.csv', index=False)


df_from_json['datetime'] = pd.to_datetime(df_from_json['datetime'])
    # print("Column 'datetime' not found in DataFrame.")
    
# print("All okay for now 2")


df_from_json['Year'] = df_from_json['datetime'].dt.year
df_from_json['Month'] = df_from_json['datetime'].dt.month


avg_values_df = df_from_json.groupby(['Year', 'Month'])[['temp','feelslike','dew','humidity','precip','precipprob','precipcover','windgust','windspeed','winddir','pressure','cloudcover']].mean().reset_index()
avg_values_df.columns = ['Year', 'Month','Avg_Temp', 'Avg_Feelslike', 'Avg_Dew', 'Avg_Humidity', 'Avg_Precipitation', 'Avg_Precipitation_Probability', 'Avg_Precipitation_Coverage', 'Avg_Wind_Gust', 'Avg_Wind_Speed', 'Avg_Wind_Direction', 'Avg_Pressure', 'Avg_Cloud_Cover']
# df_from_json.drop(['Avg_Visibility','Avg_Snowfall', 'Avg_Snow_Depth', 'Avg_Solar_Radiation', 'Avg_Solar_Energy', 'Avg_UV_Index'], axis=1)  # Drop the target variable column
avg_values_df.dropna(inplace=True)
avg_values_df.to_csv(f"./pred_data/pred_average_weather.csv", index=False)
year_details = avg_values_df["Year"]
month_details = avg_values_df["Month"]

# print(year_details)
# print(month_details)
# print("All okay for now too")
# with open('./train_data/final_merged_data.json', 'r') as json_file:
#     train_data = json.load(json_file)

# # Open the CSV file in write mode
# with open('./train_data/final_merged_data.csv', 'w', newline='') as csv_file:
#     writer = csv.writer(csv_file)

#     # Write the header based on the keys of the first item in the JSON
#     writer.writerow(train_data[0].keys())

#     # Write each row
#     for item in train_data:
#         writer.writerow(item.values())

with open('./train_data/final_merged_data.json', 'r') as json_file:
    train_data = json.load(json_file)

# Open the CSV file in write mode
with open('./train_data/final_merged_data.csv', 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)

    # Write the header based on the keys of the first item in the JSON
    writer.writerow(train_data[0].keys())

    # Write each row
    for item in train_data:
        row = []
        for key in train_data[0].keys():
            if key in item:
                row.append(item[key])
            else:
                row.append("")  # or any placeholder value you prefer
        writer.writerow(row)

# taining data
data = pd.read_csv('./train_data/final_merged_data.csv')
merged_data = data[data['District'] == f'{location}']
# print(merged_data.head())
X_train = merged_data.drop(['_id','Cases','District','Year','Month','Avg_Visibility','Avg_Snowfall', 'Avg_Snow_Depth', 'Avg_Solar_Radiation', 'Avg_Solar_Energy', 'Avg_UV_Index'], axis=1)  # Drop the target variable column
y_train = merged_data['Cases']
X_test = avg_values_df.drop(['Year','Month'],axis=1)

# Initialize SimpleImputer
# imputer = SimpleImputer(strategy='mean')  # You can choose 'mean', 'median', 'most_frequent', or a constant value

# Fit and transform the data
# X_train = imputer.fit_transform(X_train)

# Fit and transform your target variable
# Reshape y_train to a 2D array
# y_train_reshaped = np.array(y_train).reshape(-1, 1)

# Apply imputation
# y_train = imputer.fit_transform(y_train_reshaped)

# y_train = imputer.fit_transform(y_train)


# model = LinearRegression()
# model.fit(X_train, y_train)

param_grid_ridge = {'alpha': [0.01, 0.1, 1, 10, 100]}
ridge_grid_search = GridSearchCV(Ridge(), param_grid_ridge, cv=5, scoring='neg_mean_squared_error')
ridge_grid_search.fit(X_train, y_train)
best_ridge = ridge_grid_search.best_estimator_

y_pred = best_ridge.predict(X_test)

# y_pred = model.predict(X_test)
y_pred_r = np.round(y_pred)
# print(y_pred)
y_pred_r = np.where(y_pred_r < 0, 0, y_pred_r)
# print(y_pred_r)

# print("All ok guys")



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
# time.sleep(2)
# print("Good man")

avg_values_df.to_json('./pred_data/pred_average_weather.json', orient='records')


data_dict = merged_data_with_details.to_dict(orient='records')
json_data = json.dumps(data_dict)

# weather_dict = avg_values_df.to_dict(orient='records')
# weather_data = json.dumps(weather_dict)

# Print the JSON data to standard output
print(json_data)

# print(weather_data)

# Make sure to flush the output to ensure it's sent immediately
sys.stdout.flush()



