# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import numpy as np

import sys
import json
import csv

json_data = sys.stdin.read()

# Load JSON data
json_data = json.loads(json_data)

print(json_data)

# Access 'days' key from JSON data and convert to DataFrame
df = pd.DataFrame(json_data['days'])

# Convert DataFrame to JSON and save to a file
df.to_json('pred_response.json')

csv_file = ""


all_data = []

filename = f"pred_response.json"
with open(f"{filename}", "r") as f:
    data = json.load(f)
df = pd.DataFrame(all_data)



#############EEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRROOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRRRRRRRRR#################################################################################################################
# Convert 'datetime' column to datetime type
df['datetime'] = pd.to_datetime(df['datetime'])

# Extract year and month from datetime
df['Year'] = df['datetime'].dt.year
df['Month'] = df['datetime'].dt.month

# Calculate average values for dew, humidity, and precip for each month and year
avg_values_df = df.groupby(['Year', 'Month'])[['temp','feelslike','dew','humidity','precip','precipprob','precipcover','snow','snowdepth','windgust','windspeed','winddir','pressure','cloudcover',	'visibility','solarradiation','solarenergy','uvindex']].mean().reset_index()

# Rename columns
avg_values_df.columns = ['Year', 'Month','Avg_Temp', 'Avg_Feelslike', 'Avg_Dew', 'Avg_Humidity', 'Avg_Precipitation', 'Avg_Precipitation_Probability', 'Avg_Precipitation_Coverage', 'Avg_Snowfall', 'Avg_Snow_Depth', 'Avg_Wind_Gust', 'Avg_Wind_Speed', 'Avg_Wind_Direction', 'Avg_Pressure', 'Avg_Cloud_Cover', 'Avg_Visibility', 'Avg_Solar_Radiation', 'Avg_Solar_Energy', 'Avg_UV_Index']

# Save to CSV
avg_values_df.to_csv(f"pred_average_weather.csv", index=False)

print("All okay for now too")



