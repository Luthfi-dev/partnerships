const SVGCashier = ({children, props}) =>{
  const size = props?.size ? props.size:'2';
  return(
    <span className={'svg-icon me-0 svg-icon-'+size+' '+props?.addClass}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="currentColor"><path d="M320 0H32V128H144v32H32L0 371.2V512H512V371.2L480 160H208V128H320V0zM96 48H256h16V80H256 96 80V48H96zM64 416H80 432h16v32H432 80 64V416zm72-200v48H88V216h48zm48 48V216h48v48H184zm0 32v48H136V296h48zm96-80h48v48H280V216zm-48 80h48v48H232V296zm144-80h48v48H376V216zm0 80v48H328V296h48z"/></svg>
    </span>
  )
}
export default SVGCashier