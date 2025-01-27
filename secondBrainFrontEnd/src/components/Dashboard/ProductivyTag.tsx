
interface tags{
    title:string
}
function ProductivyTag(props:tags) {
  return (
    <div className='bg-slate-400 p-1 rounded-md'>
        {"#"+ props.title}
    </div>
  )
}

export default ProductivyTag