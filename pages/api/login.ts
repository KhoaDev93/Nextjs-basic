// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from "cookies";
import httpProxy, { ProxyResCallback } from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(404).json({
      message: "Method is not support",
    });
  }

  return new Promise((resolve) => {
    // req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });

      proxyRes.on("end", function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          console.log(accessToken, expiredAt);

          const cookies = new Cookies(req, res);
          cookies.set("access_token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expiredAt),
          });
          (res as NextApiResponse)
            .status(200)
            .json({ message: "Login successfully" });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Something went wrong" });
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: "https://js-post-api.herokuapp.com/",
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
