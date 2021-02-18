import ReactLoading from 'react-loading'

function LoadingSpin(){

  return(
    <div className="container mx-auto flex flex-row justify-center">
      <ReactLoading type="spin" color="##FF2D00"/>
    </div>
  )
}

export default LoadingSpin