import React from 'react'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Image = styled.img`
    width: 200px;
`;
 const ProductDetails = ({product}) => {
     const {id, comments , company , description , name, url, votes , imageUrl,created} = product
     return ( 
         <li>
             <div>
                 <div>
                    <Image src={imageUrl} alt=""/>
                 </div>
                 <div>
                     <h1>{name}</h1>
                     <p>{description}</p>
                     <div>
                         <img src="/static/img/comment.svg" alt=""/>
                         <p>{comments.length} Comments</p>
                     </div>
                     <p>{formatDistanceToNow(new Date(created))} </p>
                 </div>
             </div>
             <div>
                 <div>&#9650;</div>
                 <p>{votes}</p>
             </div>
         </li>
      );
 }
  
 export default ProductDetails;