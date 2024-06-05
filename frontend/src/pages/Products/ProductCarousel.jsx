import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import {
    FaBox, FaClock, FaShoppingCart, FaStar, FaStore
} from "react-icons/fa";
import HeartIcon from "../../components/HeartIcon";

const ProductCarousel = (product) => {

    const {data:productApiSlice,isLoading,error}=useGetTopProductsQuery();
    const settings={
        dots:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:3000,
    };

  return (
      <div className="mb-4 xl:block lg:block md:block">
        <HeartIcon product={product}/>
        {isLoading ? null:error?(
            <Message variant="danger">
                {error?.data?.message||error.message}
            </Message>
        ):(
            <Slider 
            {...settings} className="xl:w-[50rem] lg:w[56rem] md:-[56rem] sm:w-[40rem] sm:block"
            >

                {productApiSlice.map(({image,_id,price,description,brand,createdAt,numReviews,rating,quantity,countInStock})=>(
                    <div key={_id}>
                        <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]" />

                        <div className="flex justify-between w-[20rem]">
                            <div className="one">
                                <h2>{name}</h2>
                                <p> ₹ {price}</p> <br />
                                <p className="w-[25rem]">{description.substring(0,160)}...</p>
                            </div>

                            <div className="flex justify-between w-[20rem]">
                                <div className="one">
                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStore className="mr-2 text-black"/> Brand: {brand}
                                    </h1>

                                    <h1 className="flex items-center mb-6 w-[20 rem]">
                                        <FaClock className="mr-2 text-black"/> Added: {moment(createdAt).fromNow()}
                                    </h1>

                                    <h1 className="flex items-center mb-6 w-[8rem]">
                                        <FaStar className="mr-2 text-black"/> Reviews: {numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaStar className="mr-2 text-black"/>Ratings:{Math.round(rating)}
                                    </h1>

                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                    <FaShoppingCart className="mr-2 text-black"/>Quantity:{quantity}
                                    </h1>

                                    <h1 className="flex items-center mb-6 w-[10rem]">
                                    <FaBox className="mr-2 text-black"/>In Stock:{countInStock}
                                    </h1>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        )}
      
    </div>
  )
}

export default ProductCarousel
