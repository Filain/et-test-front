import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {userService} from "../../servises/userService";
import {EWhereHere, IFormValues} from "../../interfases/user.ts";
import "react-datepicker/dist/react-datepicker.css";

const RegisterForm: FC = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<IFormValues>()
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const save: SubmitHandler<IFormValues> = async (data) => {
        const user = await userService.saveUser(data)
            .catch((error) => alert(`${error.response?.data?.message || error.message}`));
        if (user) {
            navigate(`/users/${id}`)
        }
        reset()
    }

    return (
        <div className=" flex justify-center items-center h-[100vh] w-[100vw] ">
            <div className="p-6 border rounded-2xl mt-[-250px]">
                <form onSubmit={handleSubmit(save)} className="">
                    <>
                        <input type="hidden" value={+id} {...register('event_id', {
                            valueAsNumber: true,
                            required: true
                        })} />
                    </>
                    <div className="m-2 flex ">
                        <label
                            className="p-2 font-bold w-[80px] block"
                        >Name:</label>
                        <input {...register('name', {required: true})}
                               className="p-2 mr-6 rounded-md border border-gray-300"
                        />
                        {errors.name ? (<div
                            className="flex justify-center items-center text-red-500 uppercase font-bold h-[48px] w-[90px]">Required!</div>) : (
                            <div className="h-[48px] w-[90px]"></div>)}
                    </div>
                    <div className="m-2 flex">
                        <label
                            className="p-2 font-bold w-[80px] block"
                        >Email:</label>
                        <input type="email" {...register('email', {required: true})}
                               className="p-2 mr-6 rounded-md border border-gray-300"
                        />
                        {errors.email ? (<div
                            className="flex justify-center items-center text-red-500 uppercase font-bold h-[48px] w-[90px]">Required!</div>) : (
                            <div className="h-[48px] w-[90px]"></div>)}
                    </div>
                    <div className="m-2 flex">
                        <label
                            className="p-2 font-bold w-[80px] block"
                        >Date:</label>
                        <input type="date" {...register('date_birth', {required: true})}
                               className="p-2 mr-6 rounded-md border border-gray-300"
                        />
                        {errors.date_birth ? (<div
                            className="flex justify-center items-center text-red-500 uppercase font-bold h-[48px] w-[90px]">Required!</div>) : (
                            <div className="h-[48px] w-[90px]"></div>)}
                    </div>
                    <p className="p-2 font-bold text-center text-xl ">Where did yoy hear about this event?</p>
                    <div className="flex justify-center items-center">
                        <label className="p-2 font-bold flex items-center">
                            <input
                                type="radio"
                                value={EWhereHere.social_media}
                                {...register('where_hear', {required: true})}
                                className="form-radio h-4 w-4 text-[#646cff] focus:ring-[#646cff] border-gray-300"
                            />
                            <span className="ml-2">Social media</span>
                        </label>

                        <label className="p-2 font-bold flex items-center">
                            <input
                                type="radio"
                                value={EWhereHere.friends}
                                {...register('where_hear', {required: true})}
                                className="form-radio h-4 w-4 text-[#646cff] focus:ring-[#646cff] border-gray-300"
                            />
                            <span className="ml-2">Friends</span>
                        </label>

                        <label className="p-2 font-bold flex items-center">
                            <input
                                type="radio"
                                value={EWhereHere.found_myself}
                                {...register('where_hear', {required: true})}
                                className="form-radio h-4 w-4 text-[#535bf2] focus:ring-[#535bf2] border-gray-300"
                            />
                            <span className="ml-2">Found myself</span>
                        </label>
                    </div>

                    {errors.where_hear ? (<div
                        className="flex justify-center items-center text-red-500 uppercase font-bold h-[24px]">Required!</div>) : (
                        <div className="h-[24px]"></div>)}
                    <div className="flex justify-center items-center m-6">
                        <button type="submit"
                                className=" whitespace-nowrap mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                        >REGISTER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {RegisterForm};