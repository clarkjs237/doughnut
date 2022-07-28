# Doughnut Finance

<img src="https://media.giphy.com/media/UHPLDRjopUi04VtRjH/giphy.gif" width="auto" height="350" />


## Description

The purpose of this application was to demonstrate my full-stack abilities by completing a personal project in 48 hours. Doughnut is what I was able to come up with. Simply, it is a way to visualize real-time price information of select digital assets and stocks. 

### There are 5 main features of the application:

1. Doughnut Chart
   - Displays the total and relative amounts and values of a given asset

2. Historical Line Graph
   - Shows the historical value of the portfolio based on the previous 100 days of pricing

3. Asset List
   - Individually list the assets, the current price, current value, and any notes
   - Additionally, you can change the total amount owned

4. Refresh and Add New Asset Buttons
   - Refreshes the charts as well as the individual asset information
   - Add New Asset Button brings up the New Item Modal

5. New Item Modal
   - Allows user to type in an asset (ex: tesla, bitcoin), the amount owned, and any notes about this


## Getting Started

1. Fork and Clone this repo
2. Add a .env.file
>> FINN_API=<finnhub.io_api_token> 
>> POLGYGON_API=<polygon_finance_api_token>
>> EOD_API=<api_for_eod_historical_data>
3. yarn install
4. yarn build
5. yarn run start


## Tech Stack
Javascript, MongoDB, Express, React, Node
## Libraries
Chakra UI, Styled-Components, Visx, React-Chart-JS
