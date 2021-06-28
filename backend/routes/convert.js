const router = require('express').Router();
const { writeFileSync } = require('fs')
const fs = require('fs')
let xlsx = require('json-as-xlsx')

let data = [
  {
    sheet: 'Semester 1',
    columns: [
      { label: 'Name', value: 'name' }, // Top level data
      { label: 'Id', value: 'id' },
      { label: 'Test', value: 'user' },
      { label: 'Grade', value: row => (row.age + ' years') }, // Run functions
      { label: '%', value: row => (row.more ? row.more.phone || '' : '') }, // Deep props
    ],
    content: [
      { user: 'First grade', age: 9, more: { phone: '10' } },
      { user: 'Luis', age: 8, more: { phone: '10' } }
    ]
  },
  {
    sheet: 'Semester 2',
    columns: [
      { label: 'User', value: 'user' }, // Top level data
      { label: 'Age', value: row => (row.age + ' years') }, // Run functions
      { label: 'Phone', value: row => (row.more ? row.more.phone || '' : '') }, // Deep props
    ],
    content: [
      { user: 'Andrea', age: 20, more: { phone: '11111111' } },
      { user: 'Luis', age: 21, more: { phone: '12345678' } }
    ]
  },
]

let settings = {
  fileName: 'MySpreadsheet', // Name of the spreadsheet
  extraLength: 3, // A bigger number means that columns will be wider
  writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
}

router.route('/download').get((req, res) => {
    let buffer = xlsx(data, settings)
    res.setHeader('Content-Disposition', 'attachment; filename=dramaticpenguin.xlsx');

    /* 
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-disposition': `attachment; filename=MySheet.xlsx`
    })
    res.end(buffer)
     */

    res.send(buffer)


});

// localhost:5000/convert/local
// localhost:5000/convert/download

router.route('/local').get((req, res) => {
    let buffer = xlsx(data, settings)
    const homedir = require('os').homedir()
    writeFileSync(`${homedir}/MySheet.xlsx`, buffer)
    res.status(200).send('xd')
});




module.exports = router;