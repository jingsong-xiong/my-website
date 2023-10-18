cd app &&
git pull &&
pnpm install --production=false &&
pnpm build &&
pnpm typeorm:build &&
pnpm migration:run &&
docker build -t aslanxiong/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d aslanxiong/node-web-app &&
echo 'OK'
