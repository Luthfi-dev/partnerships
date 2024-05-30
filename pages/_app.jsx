import "../public/assets/css/custom.css?v=1.0.0.1.5";
import "../public/assets/plugins/custom/datatables/datatables.bundle.css"
import "../public/assets/css/style.bundle.css?v=1.0.0.7"
import "../public/assets/css/fonts.css"
import "../public/assets/plugins/custom/jstree/jstree.bundle.css"
import "../public/assets/plugins/global/plugins.bundle.css"
import NextNProgress from "nextjs-progressbar"
import App from 'next/app'

export default function MyApp({Component,pageProps }) {
  return<>
    <NextNProgress
    color="#29D"
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    showOnShallow={true}
    />
    <Component {...pageProps} />
  </>
}

MyApp.getInitialProps = async (appContext) => {
  const token = appContext.ctx.req.cookies.fast_token;
  const SECRET_KEY = process.env.SECRET_KEY_JWT;
  const jwt = require('jsonwebtoken');
  const pathName = appContext.router.pathname.split('/')
  const byPassPath = ['confirm','_error','assets','logout'];
  var res = appContext.ctx.res;
  if(! byPassPath.includes(pathName[1])){
    if( (token === '' || typeof(token)==='undefined') && appContext.router.pathname!='/login' ){
      res.writeHead(302, { // or 301
        Location: process.env.BASE_PATH + "/login",
      });
      res.end();
    }else if(token!=''){
      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        const referefURL = appContext.ctx.req.headers.referer
        if(appContext.router.pathname === '/login' && !err){
          res.writeHead(302, { // or 301
            Location: referefURL ? referefURL : process.env.BASE_PATH + "/home",
          });
          res.end();
        }
        appContext.ctx.req.cookies.user=JSON.stringify(decoded)
      })
    }
  }
  const pageProps = await App.getInitialProps(appContext);
  return { pageProps: pageProps };
}
