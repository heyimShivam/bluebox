import React from "react";
import Slider from "react-slick";
// import ReadMoreAndLess from "react-read-more-less";
export default function SimpleSlider(testimonials) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {testimonials.testimonials.results?.map((obj) => {
        return (
          <div className="slide">
            <div className="card position-relative">
              <div className="card-body py-4 px-3">
                <p className="fs-13">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                </p>
                <p
                  className="fs-13"
                  dangerouslySetInnerHTML={{ __html: obj.content }}
                ></p>
                {/* <ReadMoreAndLess
                  className="read-more-content"
                  charLimit={10}
                  readMoreText="read more"
                  readLessText="read less"
                >
                
                  sjh kjhfjsdfkj sdjfs d9809809          989 8fk ff s ff f  shsdfhk sd fj ss sd fsdkfhsdfhks df g gd 
                </ReadMoreAndLess> */}
                <div className="row">
                  <div className="col-3">
                    <img src={obj.image} className="img-fluid" alt="" />
                  </div>
                  <div className="col-9 pl-0">
                    <p className="fs-13 font-weight-bold mb-0">{obj.name}</p>
                    <p className="fs-13">{obj.occupation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
