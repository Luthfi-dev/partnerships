const SVGExternalLinkBlock = ({children, props}) =>{
  const size = props?.size ? props.size:'2';
  return(
    <span className={'svg-icon me-0 svg-icon-'+size}>
    
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" d="M17 6H3C2.4 6 2 6.4 2 7V21C2 21.6 2.4 22 3 22H17C17.6 22 18 21.6 18 21V7C18 6.4 17.6 6 17 6Z" fill="black"/>
    <path d="M17.8 4.79999L9.3 13.3C8.9 13.7 8.9 14.3 9.3 14.7C9.5 14.9 9.80001 15 10 15C10.2 15 10.5 14.9 10.7 14.7L19.2 6.20001L17.8 4.79999Z" fill="black"/>
    <path opacity="0.3" d="M22 9.09998V3C22 2.4 21.6 2 21 2H14.9L22 9.09998Z" fill="black"/>
    </svg>

    </span>
  )
}
export default SVGExternalLinkBlock