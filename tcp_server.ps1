$port = 8088
$root = "C:\Users\alira\.gemini\antigravity\scratch\almadaifi-luxury"

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()
Write-Host "TCP Web Server listening on port $port"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json; charset=utf-8"
    ".ico"  = "image/x-icon"
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $buffer = New-Object byte[] 4096
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        if ($bytesRead -gt 0) {
            $reqText = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $bytesRead)
            $firstLine = $reqText.Split("`n")[0].Trim()
            $parts = $firstLine.Split(" ")
            if ($parts.Length -ge 2) {
                $rawPath = $parts[1].Split("?")[0]
                if ($rawPath -eq "/" -or [string]::IsNullOrEmpty($rawPath)) {
                    $rawPath = "/index.html"
                }
                $filePath = Join-Path $root ($rawPath.TrimStart('/').Replace('/', '\'))
                if (Test-Path $filePath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = $mimeTypes[$ext]
                    if (-not $mime) { $mime = "application/octet-stream" }
                    $content = [System.IO.File]::ReadAllBytes($filePath)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($content.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($content, 0, $content.Length)
                } else {
                    $msg = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1>")
                    $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/html`r`nContent-Length: $($msg.Length)`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($msg, 0, $msg.Length)
                }
            }
        }
        $stream.Flush()
        $client.Close()
    } catch {
        # ignore errors
    }
}
