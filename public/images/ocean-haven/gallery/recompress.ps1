# Define the output directory
$outputDir = "output"

# Define size thresholds
$inputSizeThreshold = 1MB           # 1MB = 1048576 bytes
$targetOutputSize = 500KB           # 500KB = 512000 bytes

# Process each WebP file over 1MB
Get-ChildItem -Path $outputDir -Filter *.webp | Where-Object {
    $_.Length -gt $inputSizeThreshold
} | ForEach-Object {
    $filePath = $_.FullName
    $tempFile = "$filePath.temp"

    Write-Host "🔄 Recompressing $($_.Name) (Original Size: $([math]::Round($_.Length / 1KB)) KB)..."

    # Recompress with lossy options to target 500KB
    cwebp -size $targetOutputSize -pass 6 -af -jpeg_like -f 50 -sns 70 "$filePath" -o "$tempFile"

    if (Test-Path $tempFile) {
        $newSize = (Get-Item $tempFile).Length
        if ($newSize -le $targetOutputSize) {
            Move-Item -Force "$tempFile" "$filePath"
            Write-Host "✅ $($_.Name) recompressed to $([math]::Round($newSize / 1KB)) KB"
        } else {
            Remove-Item "$tempFile"
            Write-Host "⚠️ $($_.Name) could not be reduced below 500KB"
        }
    } else {
        Write-Host "❌ Failed to recompress $($_.Name)"
    }
}

Write-Host "`n✅ Recompression process completed."
