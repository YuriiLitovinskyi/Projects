import React from 'react';



class  AlertSuc extends React.Component {
 render(){  
  return  (
    <div className="alert alert-success" role="alert">
  <strong>New hasp info was successfully added to database!</strong> 
</div>)   
  } 
 }

 class  AlertDelAll extends React.Component {
 render(){  
  return  (
    <div className="alert alert-danger">
  <strong>All hasp info was removed from database!</strong> 
</div>)   
  } 
 }

 class  AlertCurAll extends React.Component {
 render(){  
  return  (
    <div className="alert alert-warning" role="alert">
  <strong>Current hasp info was removed from database successfully!</strong> 
</div>)   
  } 
 }

 class  AlertCurmodif extends React.Component {
 render(){  
  return  (
    <div className="alert alert-success" role="alert">
  <strong>Hasp info was modified in database successfully!</strong> 
</div>)   
  } 
 }


 export { AlertSuc, AlertDelAll, AlertCurAll, AlertCurmodif };