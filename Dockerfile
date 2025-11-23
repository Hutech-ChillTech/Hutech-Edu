FROM node:20-alpine

# Thư mục làm việc
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Cài dependencies (bỏ dev nếu muốn)
RUN npm install --omit=dev

# Copy toàn bộ source
COPY . .

# Build TypeScript sang JS
RUN npm run build

# Copy Firebase JSON vào dist/configs (sau khi build)
RUN mkdir -p dist/configs && cp src/configs/*.json dist/configs/

# Mở port backend
EXPOSE 5173

# Chạy app
CMD ["npm", "run", "start"]
