import { Error } from "../utils/error.util.js";
import getData from "../utils/stock.util.js";
import { timelineFunction } from "../utils/timeline.util.js";

export const getHoldings = async (req, res) => {
  try {
    const response = await getData(res);
    if (!response) return Error(404, false, "Not found", res);

    res.status(200).json({
      success: true,
      message: "All Holdings",
      response, // all holdings
    });
  } catch (error) {
    console.log(error);
    Error(500, false, "Server error", res);
  }
};

export const allocation = async (req, res) => {
  try {
    const response = await getData(res);
    if (!response) return Error(404, false, "Not found", res);

    let bySector = {};
    let byMarketCap = {};
    let values = 0; //total holding values

    response.forEach((item) => {
      const value = Number(item["Value ₹"]) || 0;
      values += value;
    });

    response.forEach((item) => {
      const sector = item["Sector"]?.trim();
      const marketCap = item["Market Cap"]?.trim();
      const value = Number(item["Value ₹"]) || 0;

      //grouping sector
      if (!bySector[sector]) {
        bySector[sector] = { value: 0, percentage: 0 };
      }
      bySector[sector].value += value;

      //grouping market cap
      if (!byMarketCap[marketCap]) {
        byMarketCap[marketCap] = { value: 0, percentage: 0 };
      }
      byMarketCap[marketCap].value += value;

      //Calculation
    });
    Object.keys(bySector).forEach((sector) => {
      bySector[sector].percentage = (
        (bySector[sector].value / values) *
        100
      ).toFixed(1);
    });

    Object.keys(byMarketCap).forEach((cap) => {
      byMarketCap[cap].percentage = (
        (byMarketCap[cap].value / values) *
        100
      ).toFixed(1);
    });

    res.status(200).json({
      success: true,
      byMarketCap,
      bySector,
    });
  } catch (error) {
    console.log(error);
    return Error(500, false, "Server error", res);
  }
};

export const performance = async (req, res) => {
  try {
    const response = await getData(res);
    if (!response) return Error(404, false, "Not found", res);

    const timeline = timelineFunction();
    if (!timeline) return Error(404, false, "Not found", res);

    // get help by ai (chatgpt)
    // calculate percentage returns
    const calculateReturn = (latest, past) => {
        return Number(((latest - past) / past) * 100).toFixed(1);
    }

    const returns = {
      portfolio: {
        "1month": calculateReturn(timeline[2].portfolio, timeline[1].portfolio),
        "3months": calculateReturn(timeline[2].portfolio, timeline[0].portfolio),
        "1year": calculateReturn(timeline[2].portfolio, timeline[0].portfolio), 
      },
      nifty50: {
        "1month": calculateReturn(timeline[2].nifty50, timeline[1].nifty50),
        "3months": calculateReturn(timeline[2].nifty50, timeline[0].nifty50),
        "1year": calculateReturn(timeline[2].nifty50, timeline[0].nifty50),
      },
      gold: {
        "1month": calculateReturn(timeline[2].gold, timeline[1].gold),
        "3months": calculateReturn(timeline[2].gold, timeline[0].gold),
        "1year": calculateReturn(timeline[2].gold, timeline[0].gold),
      },
    };

    return res.status(200).json({
      success: true,
      timeline,
      returns,
    });

  } catch (error) {
    console.log(error);
    return Error(500, false, "Server error", res); 
  }
};

export const summary = async (req, res) => {
  try {
    const response = await getData(res);
    if (!response) return Error(404, false, "Not found", res);

    //Initializing
    let totalValue = 0;
    let totalInvested = 0;
    let topPerformer = null;
    let worstPerformer = null;
    const sectors = new Set();

    response.forEach((item) => {
      const value = Number(item['Value ₹']) || 0;
      const quantity = Number(item['Quantity']) || 0;
      const avgPrice = Number(item['Avg Price ₹']) || 0;
      const gainPercent = Number(item['Gain/Loss %']) || 0;

      totalValue += value; 
      totalInvested += quantity * avgPrice; //average price

      if (item['Sector']) sectors.add(item['Sector'].trim());

      // comparing
      if (!topPerformer || gainPercent > topPerformer.gainPercentNum) {
        topPerformer = {
          symbol: item['Symbol'],
          name: item['Company Name'],
          gainPercentNum: gainPercent,
        };
      }

      if (!worstPerformer || gainPercent < worstPerformer.gainPercentNum) {
        worstPerformer = {
          symbol: item['Symbol'],
          name: item['Company Name'],
          gainPercentNum: gainPercent,
        };
      }
    });

    //get help by Ai (chatgpt)
    const totalGainLoss = totalValue - totalInvested;
    const totalGainLossPercent = ((totalGainLoss / totalInvested) * 100).toFixed(2);
    const diversificationScore = sectors.size;

    let riskLevel = "Moderate";
    if (totalGainLossPercent > 15) riskLevel = "Low";
    else if (totalGainLossPercent < 5) riskLevel = "High";

    res.status(200).json({
      success: true,
      totalValue: Math.round(totalValue),
      totalInvested: Math.round(totalInvested),
      totalGainLoss: Math.round(totalGainLoss),
      totalGainLossPercent,
      topPerformer: {
        symbol: topPerformer.symbol,
        name: topPerformer.name,
        gainPercent: (topPerformer.gainPercentNum * 100).toFixed(2) 
      },
      worstPerformer: {
        symbol: worstPerformer.symbol,
        name: worstPerformer.name,
        gainPercent: (worstPerformer.gainPercentNum * 100).toFixed(2) 
      },
      diversificationScore,
      riskLevel,
    });
  } catch (error) {
    console.log(error);
    Error(500, false, "Server error", res);
  }
};


