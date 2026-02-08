$ErrorActionPreference = 'Stop'
$cssFiles = Get-ChildItem -Path (Join-Path $PSScriptRoot '..\CSS') -Recurse -Filter *.css -File -ErrorAction SilentlyContinue
if (-not $cssFiles) { Write-Output "No se encontraron archivos CSS en ./CSS"; exit 0 }
$pattern = '(?s)/\*.*?\*/'
$modified = @()

foreach ($f in $cssFiles) {
    $s = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $new = [regex]::Replace($s, $pattern, '')
    if ($new -ne $s) {
        # Trim trailing blank lines that can appear after comment removal
        $new = $new -replace "[\r\n]{3,}", "`r`n`r`n"
        Set-Content -Path $f.FullName -Value $new -Encoding UTF8
        $modified += $f.FullName
        Write-Output "Modified: $($f.FullName)"
    }
}

Write-Output "Done. Processed $($cssFiles.Count) CSS files. Modified: $($modified.Count) files."