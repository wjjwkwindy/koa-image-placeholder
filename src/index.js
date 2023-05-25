const generateImg = require("image-generate");

const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();

app.use(cors());
app.use(async (ctx) => {
    const path = ctx.request.path;
    path.split("/").forEach((item) => {
        if (item) {
            const size = /(\d+)x(\d+)/.exec(item);
            const query = ctx.request.query;

            if (size) {
                ctx.response.status = 200;
                ctx.type = "image/png";
                ctx.body = generateImg(
                    Number(size[1]),
                    Number(size[2]),
                    query.text
                );
            }
        } else {
            ctx.response.status = 404;
            ctx.body = "404";
        }
    });
});

app.listen(3000, () => {
    console.log("server is running at http://localhost:3000");
});
