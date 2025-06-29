export const isAuthenticated = (req,res,next) =>{

  const age = parseInt(req.query.age)

  if(age < 18){
    res.send("Must be older than 18")
  }
  else{
    next()
  }
}