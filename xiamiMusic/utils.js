const cheerio = require('cheerio')
const Excel = require('exceljs')

let getRes = (res) => {
  let arr =  []

  let $ = cheerio.load(res.text)
  
  $('.collectThread_list.common_sec3.pool10.blank10 ul li').each((index, ele) => {
    let name = $(ele).find('.cover a').attr('title')
    let id = $(ele).find('.cover a').attr('href').match(/\/collect\/(\d*)?/)[1]
    let cover = $(ele).find('.cover img').attr('src')
    arr.push({
      id,
      name,
      cover
    })
  })
  return arr
}


let json2excel = (data) => {
  let workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: './xiami-music.xlsx'
  });
  let worksheet = workbook.addWorksheet('Sheet');

  worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: 'name', key: 'name' },
    { header: 'cover', key: 'cover' }
  ];

  for(let i in data) {
    worksheet.addRow(data[i]).commit();
  }
  workbook.commit();
}

module.exports = {
  getRes,
  json2excel
}