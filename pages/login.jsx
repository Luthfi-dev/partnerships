import getConfig from 'next/config'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { imgLoader } from '../utility/Image'
import { get } from '../utility/Service'

export default function Login(){
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(async () => {
    const backto = router?.query?.backto
    if(backto){
      sessionStorage.setItem('backto', backto)
    }
    const asPath = router?.asPath
    const response = asPath?.split('#')[1]
    if(response){
      const convertToJSON = JSON.parse('{"' + response?.replace(/&/g, '","')?.replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
      const accessToken = convertToJSON?.access_token
      const splitToken = accessToken.split('.')
      const payloadToken = splitToken[1]
      const decodePayloadToken =  Buffer.from(payloadToken, 'base64').toString('ascii')
      const convertToJSONDecodePayload = JSON.parse(decodePayloadToken)
      const uniqeName = convertToJSONDecodePayload.unique_name
      if(uniqeName){
        setLoadingVerify(true)
        try {
          const axios = require('axios');
          var http = require('http')
          var https = require('https');
          const verifyUser = await axios.request({
            method:'post',
            url:'/api/auth/verify/microsoft',
            baseURL: publicRuntimeConfig.HOST_COOKIES,
            data: { token_access: accessToken  },
            httpAgent: new http.Agent({ rejectUnauthorized: false }),
            httpsAgent: new https.Agent({ rejectUnauthorized: false}),
            withCredentials: true
          }) 

          if(verifyUser.status !== 200){
            throw Object({ message: verifyUser.statusText})
          }
          if(verifyUser.data?.status !== true){
            throw Object({ message: verifyUser.data?.message})
          }
          if(!verifyUser.data?.data?.rules_access?.id_group_menu){
            throw Object({ message: 'Rules Access not Found.'})
          }
          const getMenuAcess = await get({url: 'menu/group/detail/' + verifyUser.data?.data?.rules_access?.id_group_menu, token: verifyUser?.data?.data?.token})
          if(getMenuAcess.status !== 200){
            throw Object({ message: 'Cannot Get Data Rules Access.'})
          }
          if(getMenuAcess.data?.status !== true){
            throw Object({ message: getMenuAcess?.data?.message})
          }
          localStorage.removeItem("fast_menu");
          localStorage.setItem('fast_menu', JSON.stringify(getMenuAcess?.data?.data));

          await axios.request({
            method:'post',
            url:'/Login/verify_login_microsoft',
            baseURL: publicRuntimeConfig.BASE_URL,
            data: { token: accessToken  },
            httpAgent: new http.Agent({ rejectUnauthorized: false }),
            httpsAgent: new https.Agent({ rejectUnauthorized: false}),
          }) 
          setLoadingVerify(false)
          const getBacktoURL = sessionStorage.getItem('backto')
          if(getBacktoURL){
            sessionStorage.removeItem('backto')
            window.location.href = getBacktoURL
          }
          if(!getBacktoURL){
            window.location.href = publicRuntimeConfig.BASE_URL + publicRuntimeConfig.BASE_PATH + '/home'
          }
        } catch (error) {
          setLoadingVerify(false)
          setErrorMessage(error?.message)
        }
      }
    }
  }, [router?.query]);

  const gotoMicrosoftAuthentication = () => {
    const clientID = publicRuntimeConfig.CLIENT_ID
    const tenantID = publicRuntimeConfig.TENANT_ID
    const directURI = publicRuntimeConfig.DIRECT_URI
    const fullURL = 'https://login.microsoftonline.com/' + tenantID + '/oauth2/v2.0/authorize?client_id=' + clientID + '&response_type=token&redirect_uri=' + directURI + '&response_mode=fragment&scope=openid profile'
    window.location.href = fullURL
  }

  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Please login to using faster</title>
        <link rel="shortcut icon" type="images/logos/inventory.ico" href="/assets/media/logos/favicon.ico" />
      </Head>
      <div className='d-flex flex-column flex-root bg- column-fluid'>
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed content_page">
          <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-10'>
            <div className='w-lg-500px bg-body rounded-1 shadow-sm p-10 p-lg-15 mx-auto'>
              <form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework' >
                <div className='text-center mb-20'>
                  <div className="container-img mw-200px d-inline-block">
                    <Image 
                    src={'/media/logos/logo_faster_full.png'} 
                    layout='fill' className="img mb-0"
                    loader={imgLoader}
                    />
                  </div>
                </div>
                <div className='text-center mb-0'>
                  <div className="container-img mw-350px d-inline-block">
                    <Image 
                    src={'/media/logos/program_assistance.jpg'} 
                    layout='fill' className="img mb-5"
                    loader={imgLoader}
                    />
                  </div>
                </div>
                <div className='text-center mb-10'>
                {
                  errorMessage !=='' &&
                  <div className="alert alert-dismissible bg-light-danger border border-danger rounded-1 d-flex flex-column flex-sm-row p-5 mb-5">
                    <div className="d-flex flex-column pe-0 pe-sm-10 text-center w-100 fs-12px text-danger">
                      <h5 className="mb-1 text-danger">Attention !</h5>
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                  }
                  <button 
                    disabled={loadingVerify}
                    data-kt-indicator={loadingVerify === true ? 'on':''}
                    className="btn btn-dark rounded-1 fw-bolder cursor-pointer w-100" onClick={()=>{gotoMicrosoftAuthentication()}} type='button'>
                    <span className="indicator-label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" className='me-2'>
                        <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                        <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                        <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                        <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                      </svg>
                      Sign in with Microsoft
                    </span>
                    <span className="indicator-progress">Verify user, Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='d-flex flex-center flex-column-auto p-10 cursor-pointer '>
            <div className='d-flex align-items-center fw-bold fs-6 '>
              <div className='text-muted text-hover-primary px-2 me-10'>Copyright &copy; Faster v2.0</div>
              <a href="https://www.fhi360.org/privacy" className="text-muted text-hover-primary px-2 fw-normal fs-12px text-decoration-underline" target="_blank">Privacy</a>
              <a href="https://www.fhi360.org/privacy" className="text-muted text-hover-primary px-2 fw-normal fs-12px text-decoration-underline" target="_blank">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}