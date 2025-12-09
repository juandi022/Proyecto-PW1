$ErrorActionPreference = 'Stop'
$root = Get-Location
$files = Get-ChildItem -Path $root.Path -Recurse -Include *.html -File
$headerPattern = '(?is)<header\b[^>]*>.*?</header>'
$commentPattern = '(?is)<!--.*?-->'

foreach ($f in $files) {
    $s = Get-Content -Path $f.FullName -Raw -Encoding UTF8
    $headerMatches = [regex]::Matches($s, $headerPattern)
    $spans = @()
    foreach ($m in $headerMatches) { $spans += ,@($m.Index, $m.Index + $m.Length) }

    $out = [regex]::Replace($s, $commentPattern, {
        param($m)
        $start = $m.Index
        $keep = $false
        foreach ($span in $spans) {
            if ($start -ge $span[0] -and $start -lt $span[1]) { $keep = $true; break }
        }
        if ($keep) { return $m.Value } else { return '' }
    })

    if ($out -ne $s) {
        Set-Content -Path $f.FullName -Value $out -Encoding UTF8
        Write-Output ("Modified: {0}" -f $f.FullName)
    }
}

Write-Output "Done. Processed $($files.Count) files."
