// import React, { useState,useEffect } from 'react'
// import { useForm } from 'react-hook-form'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { HiOutlineCurrencyRupee } from 'react-icons/hi';
// import Requirementfield from './Requirementfield';
// import { setCourse, setStep } from '../../slices/courseSlice';
// import Iconbutton from '../../components/common/Iconbutton'
// import { toast } from 'react-toastify';
// import { apiConnector } from '../../services/apiconnector';
// import { categories } from '../../services/apis';
// import {addcoursedetails} from '../../services/opration/coursedetailsapi'
// import { handleEditCourse } from '../../services/opration/coursedetailsapi';
// import { addCourseToCategory } from '../../services/opration/catalogdata';
// const Coursesinfoform = () => {
//  const {  register,setValue,handleSubmit,getValues,formState: { errors }} = useForm();
//  const dispatch = useDispatch();
//  const {course,editcourse} = useSelector((state)=>state.course || {});
//  console.log("course",course);
//  const [loading,setloading] = useState(false);
//  const [coursecategory, setcoursecategory] = useState([]);
//  const [reqiurelist,setrequiredlist]=useState([]);
// const  {token} = useSelector((state)=>state.auth);
// const [addcatcou,setaddcatcou]=useState(null);  
//  const [thumbnailPreview, setThumbnailPreview] = useState(null);
//    const [thumbnailFile, setThumbnailFile] = useState(null);
// console.log("addcatcou",addcatcou);
// console.log("token",token);
// useEffect(() => {
//     const getCotegory=async() => {
//      setloading(true);
//       const result =await apiConnector("GET",categories.CATEGORIES_API);
//     // console.log("setcoursecategory",result);
//      if(result.data.getallcategory.length > 0 ) setcoursecategory(result.data.getallcategory) 
//       console.log("setcoursecategory",result.data.getallcategory);
   

//      setloading(false);
//    }

//    if(editcourse){
//          setValue("coursetitle",course.coursename);
//          setValue("courseshortdesc",course.coursedetailse);
//          setValue("courseprice",course.price);
     
//          setValue("coursebenefit",course.whatyouwilllearn);
//          setValue("coursecategory",course.category);
//          setValue("courserequirement",course.instruction);
//          setValue("courseimage",course.courseimage);
//    }
//    getCotegory();
//  }, [editcourse, course, setValue])

//   console.log("coursecategory",coursecategory);


// const isformupdated =()=>{
//     const currentvalue =getValues();
//     if(currentvalue.coursetitle !== course.coursename ||
//       currentvalue.courseshortdesc !== course.coursedetailse ||
//       currentvalue.courseprice !== course.price ||
       
//       currentvalue.coursebenefit !== course.whatwillyoulearn ||
//       currentvalue.coursecategory._id !== course.category._id ||
//       currentvalue.courserequirement.toString() !== course.instruction.toString()||
//       currentvalue.courseimage !== course.courseimage
//       )
//      return true;
//     else
//     return false;
// }

// // handle next button click
//  const onSubmit =async(data)=>{ 
  
//    try{
//      setloading(true);
//     if(editcourse){
//       if(isformupdated()){
//         const currentvalue = getValues();
//         const formdata = new FormData();
 
//         formdata.append("courseid",course._id);
 
//         if(currentvalue.coursetitle !== course.coursename){
//          formdata.append("coursename",data.coursetitle)
//         }
//         if(currentvalue.courseshortdesc !== course.coursedetailse){
//          formdata.append("coursedetailse",data.courseshortdesc)
//         }
//         if(currentvalue.coursebenefit !== course.whatyouwilllearn){
//          formdata.append("whatyouwilllearn",data.coursebenefit)
//         }
//         if(currentvalue.coursecategory._id !== course.category._id){
//          formdata.append("category",data.coursecategory)
//         }
//         if(currentvalue.courseprice !== course.price){
//          formdata.append("price",data.courseprice)
//         }
 
//         if(currentvalue.courserequirement !== course.instruction){
//          formdata.append("instructon",data.courserequirement)
//         }
//         if(currentvalue.courseimage !== course.courseimage){
//           formdata.append("courseimage",data.courseimage)
//          }
//          console.log('Uploaded File:', data.courseimage); //
//          console.log('Form submitted successfully:', data);
//         setloading(true);
//         const result = await  handleEditCourse(formdata,token);
//         conole.log("result of course",result);
//         setloading(false);
//         if(result){
//         dispatch(setStep(2));
//          dispatch(setCourse(result));
//         }
//       }
//       else{
//      toast.error("no changes made to form data");
//         }
//         return; 
//    }
//   // create new course
//   if(addcatcou !==null && !editcourse){
//     const {category, _id}=addcatcou;
//     console.log("category",category);
//     console.log("_id",_id);
//     const result2 = await addCourseToCategory({
//       categoryid: category,
//       courseid: _id,
//     });         
//     if (result2?.success) {
//       toast.success("Course added to category successfully!");
//       dispatch(setStep(2));
//     } else {
//       toast.error(result2?.message || "Failed to add course to category");
//     }
//   }
//    if(addcatcou == null  && !editcourse){
//   const formdata = new FormData();
//   formdata.append("coursename",data.coursetitle);
//   formdata.append("coursedetailse",data.courseshortdesc);
//   formdata.append("price",data.courseprice);
//   formdata.append("category",data.coursecategory);
//   formdata.append("instructor",data.courserequirement);
//   formdata.append("whatyouwilllearn",data.coursebenefit);
//   formdata.append("courseimage",thumbnailFile);
//   //  formdata.append("status",COURSE_STATUS.DRAFT);
//   setloading(true);
//    const result  = await addcoursedetails(formdata,token);
//    console.log("result of create course",result);

//   if(result){
   
//     dispatch(setCourse(result.data));
//      }
//     if (result.data.data._id && result.data.data.category) {
//       setaddcatcou({
//         category: result.data.data.category,
//          _id: result.data.data._id,
//       });
//       toast.success("courseid and catwegory idsuccessfullliy")
//     } else {
//       console.log("Missing data in result.data:", result.data.data);
//       toast.error("Missing data in result.data:")
//     }
//   } 
  
//    }catch(error){
//     console.error("Error submitting form:", error);
//     toast.error("Failed to submit form");
//     setloading(false);
//    }     
//  }  

//    const handleThumbnailChange = (event) => {
//      const file = event.target.files[0];
//      if (file) {
//       setThumbnailFile(file);
//        const fileURL = URL.createObjectURL(file);
//        setThumbnailPreview(fileURL);
 
//        // Set the file value to react-hook-form
//        setValue(courseimage[0], file);
   
//      }
//    };

 

//   return (
//     <div className='scale-75 lg:scale-100'>
//       {
//          !loading ?
//           (
//             <form onSubmit={handleSubmit(onSubmit)}
//             className='bg-slate-700 p-6 text-black rounded-md space-y-5'>
//               <div>
//                   <label>Course title<sup>*</sup></label>
//                   <input id='coursetitle'
//                   placeholder='enter the coures title'
//                   {...register("coursetitle",{required:true})}
//                   className="w-full p-1 rounded-md font-semibold"
//                    />
      
//                    {
//                       errors.coursetitle && (<span>course title is required</span>)
//                    }
//               </div>
      
//               <div>
//                   <label>Course short description<sup>*</sup></label>
//                   <textarea id='courseshortdesc'
//                   placeholder='enter description'
//                   {...register("courseshortdesc",{required:true})}
//                   className="w-full min-h-[120px] p-1 rounded-md font-semibold"
//                    />
      
//                    {
//                       errors.courseshortdesc && (<span>course description is required</span>)
//                    }
//               </div >
      
//               <div className='relative'>
//                   <label>Course Price<sup>*</sup></label>
//                   <input id='courseprice'
//                   placeholder='enter the course price'
//                   {...register("courseprice",{required:true,valueAsNumber:true})}
//                   className="w-full p-1 rounded-md font-semibold"
//                    />
//                   <HiOutlineCurrencyRupee className='abslute'/>
//                    {
//                       errors.courseprice && (<span>course price is required</span>)
//                    }
       
//               </div>
      
//               <div>
//               <label>Course Category<sup>*</sup></label>
//               <select
//                 id="coursecategory"
//                 defaultValue=""
//                 {...register("coursecategory", { required: true })}
//                 className="w-full p-1 rounded-md font-semibold"
//               >
//                 <option value="" disabled>
//                   {loading ? "Loading categories..." : "Choose a category"}
//                 </option>
//                 {coursecategory.map((category) => (
//                   <option value={category._id} key={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.coursecategory && <span>Course category is required</span>}
//             </div>
             
//               {/* upload thumbnnail */}
//               <div>
//             <div className="course-thumbnail-uploader">
//               <label   className="block font-medium mb-2">
//                 Upload Course Thumbnail
//               </label>
            
//               <input
//                 type="file"
//                 id='courseimage'
//                 {...register("courseimage", { required:true })}
//                 accept=".jpg, .jpeg, .png, .gif" // Limit accepted formats
//                 onChange={handleThumbnailChange}
//                 className="font-bold p-3  rounded-md  "
//               />
//               {errors.courseimage && <span className="text-red-500">thumnail is required</span>}
      
//               {/* Display the thumbnail preview */}
//               {thumbnailPreview && (
//                 <div className="thumbnail-preview mb-4">
//                   <img
//                     src={thumbnailPreview}
//                     alt="Course Thumbnail Preview"
//                     className="w-52 h-32 ml-5 p-1 rounded-md font-semibold"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
      
//               {/* benefits of course */}
      
//               <div>
//                   <label>Benifits of Course <sup>*</sup></label>
//                   <textarea id='coursebenefit'
//                   placeholder='enter course benefit'
//                   {...register("coursebenefit",{required:true})}
//                   className="w-full h-[190px] p-1 rounded-md font-semibold"
//                    />
      
//                    {
//                       errors.coursebenefit && (<span>course benefit is required</span>)
//                    }
//               </div >
//               <Requirementfield
//                 errors={errors}
//                 label="courserequirement"
//                 name="courserequirement"
//                 reqiurelist={reqiurelist}
//                 setrequiredlist={setrequiredlist}   
//                 register={register}
//                 setValue={setValue}
//               />
      
//          <div>
//           {
//             editcourse  && (
//               <button
//               onClick={()=>dispatch(setStep(2))}
//               className='bg-yellow-400 flex justify-center font-bold p-2 
//     hover:scale-90 cursor-pointer hover:bg-green-400 transition-all duration-150'
//               >
//                  Continue without Saving
//               </button>
//             )
//           }
//           <Iconbutton
   
//           text={!addcatcou?"Next":editcourse? "save changes":"course add to category"}
//           disabled={loading}
//           />
      
//          </div>
      
//             </form>
//           ):
//           (<div className='mt-28 text-white text-3xl'>submiting</div>)
//       }
   
//     </div>
//   )
// }

// export default Coursesinfoform
