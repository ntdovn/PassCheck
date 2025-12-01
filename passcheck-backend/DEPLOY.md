# Deploy to Fly.io Instructions

## Đã sửa các vấn đề:

1. ✅ Server giờ bind vào `0.0.0.0` thay vì mặc định (cần thiết cho Fly.io)
2. ✅ Tạo file `fly.toml` với cấu hình đúng
3. ✅ Tạo `Dockerfile` tối ưu cho production
4. ✅ Port được set thành 8080 (Fly.io's internal port)

## Các bước deploy:

1. Build lại và deploy:
   ```bash
   fly deploy
   ```

2. Kiểm tra logs nếu có lỗi:
   ```bash
   fly logs
   ```

3. Kiểm tra status:
   ```bash
   fly status
   ```

4. Set environment variables (nếu cần):
   ```bash
   fly secrets set CORS_ORIGIN=https://yourdomain.com
   ```

## Lưu ý:

- Port 8080 được dùng internally trong container
- Fly.io sẽ tự động map 80/443 (HTTP/HTTPS) vào port 8080 của container
- Health check endpoint: `/api/health`
- Server sẽ tự động start/stop để tiết kiệm chi phí

## Troubleshooting:

Nếu vẫn lỗi 502, chạy:
```bash
fly logs --app passcheck-backend
```
