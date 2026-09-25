import JSZip from 'jszip'

// converts a 0-based column index to its spreadsheet letter (0 -> A, 25 -> Z, 26 -> AA ...)
function columnLetter(index) {
    let n = index + 1
    let letter = ''
    while (n > 0) {
        const remainder = (n - 1) % 26
        letter = String.fromCharCode(65 + remainder) + letter
        n = Math.floor((n - 1) / 26)
    }
    return letter
}

// escapes text so it is safe to place inside xlsx xml
function escapeXml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function buildSheetXml(headers, rows) {
    const allRows = [headers, ...rows]
    const rowsXml = allRows.map((row, rowIndex) => {
        const rowNumber = rowIndex + 1
        const cellsXml = row.map((value, colIndex) => {
            const cellRef = columnLetter(colIndex) + rowNumber
            return `<c r="${cellRef}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`
        }).join('')
        return `<row r="${rowNumber}">${cellsXml}</row>`
    }).join('')

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`
}

// builds a real .xlsx file (a zip of xml parts) from a header row and data rows, and downloads it
async function exportToXlsx(headers, rows, filename) {
    const zip = new JSZip()

    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`)

    zip.folder('_rels').file('.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`)

    const xl = zip.folder('xl')
    xl.file('workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Employees" sheetId="1" r:id="rId1"/></sheets></workbook>`)

    xl.folder('_rels').file('workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`)

    xl.folder('worksheets').file('sheet1.xml', buildSheetXml(headers, rows))

    const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
}

export default exportToXlsx
