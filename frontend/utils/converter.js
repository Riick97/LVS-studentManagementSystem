"use strict";
var xlsx_1 = XLSX

function convert (data, settings) {
    if (settings === void 0) {
        settings = {}
    }
    var extraLength = settings.extraLength || 1;
    var writeOptions = settings.writeOptions || {};
    var wb = xlsx_1.utils.book_new();
    data.forEach(function (actualSheet, actualIndex) {
        var excelColumns = 0;
        var excelContent = [];
        var excelIndexes = [];
        actualSheet.content.forEach(function (el1) {
            var obj = {};
            actualSheet.columns.forEach(function (el2, in2) {
                var val = typeof el2.value === "function" ? el2.value(el1) : el1[el2.value];
                obj[el2.label] = val;
                excelColumns = in2 + 1
            });
            excelContent.push(obj)
        });
        var newSheet = xlsx_1.utils.json_to_sheet(excelContent); {
            var rangeOfColumns = xlsx_1.utils.decode_range(newSheet["!ref"] || "");
            for (var C = rangeOfColumns.s.c; C <= rangeOfColumns.e.c; C++) {
                var address = xlsx_1.utils.encode_col(C) + "1";
                excelIndexes.push(address)
            }
        }
        newSheet["!cols"] = [];
        var whileLoop = 0;
        while (whileLoop < excelColumns) {
            var xx = excelIndexes[whileLoop];
            var size = {
                width: newSheet[xx].v.length + extraLength
            };
            for (var keyIndex in newSheet) {
                if (newSheet.hasOwnProperty(keyIndex) && xx.charAt(0) === keyIndex.charAt(0) && keyIndex.length === xx.length) {
                    var consideredElement = newSheet[keyIndex].v;
                    if (typeof consideredElement === "number") consideredElement = "" + consideredElement;
                    if (consideredElement && consideredElement.length >= size.width) size.width = consideredElement.length + extraLength
                }
            }
            newSheet["!cols"].push(size);
            whileLoop++
        }
        xlsx_1.utils.book_append_sheet(wb, newSheet, "" + (actualSheet.sheet || "Sheet " + (actualIndex + 1)))
    });
    return writeOptions.type == "buffer" ? xlsx_1.write(wb, writeOptions) : xlsx_1.writeFile(wb, (settings.fileName || "Spreadsheet") + ".xlsx", writeOptions)
};

