import axios from 'axios';

// https://docs.google.com/spreadsheets/d/e/2PACX-1vS_UPBN4vZVrODQZVxQLBDPVAAqPBlqbddynLSkbKDam1TagN8pGMC_lfOpwcVZvXW5uqNHcPMpaCX2/pubhtml
// 替換成你的 spreadsheet ID
const SPREADSHEET_ID = '1P0J7yLE6Nd7GSSJnDW2nal2zVoM3VBfYDVjg9TO0GM8';
const API_KEY = 'AIzaSyBShPyVWqfNA1odtb42EE6cvedpSFsTmWM';
const RANGE = 'caitvilist'; // 你的工作表名稱

const SHEETS_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

export const getList = async () => {
  try {
    const response = await axios.get(SHEETS_URL);
    const rows = response.data.values || [];
    
    // 假設第一行是標題
    return rows.slice(1).map(row => ({
      // 基本信息
      no: Number(row[0]) || row[0],
      name: row[1],
      url: row[2],
      author: row[3],
      
      // 章節相關
      completedChapters: row[4],
      allChapters: row[5],
      completed: row[6],
      
      // 更新與統計
      lastUpdated: row[7],
      wordCount: row[8],
      
      // 分類與評價
      tags: row[9],
      read: row[10],
      rate: row[11],
      
      // 其他信息
      memo: row[12],
      storySetting: row[13],
      hotChapters: row[14]
    }));
  } catch (error) {
    console.error('獲取列表失敗:', error);
    throw error;
  }
};