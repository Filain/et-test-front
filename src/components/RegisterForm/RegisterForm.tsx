import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

import {userService} from "../../servises/userService";
import css from "./Register.module.css"
import {EWhereHere, IFormValues} from "../../interfases/user.ts";


interface IProps {

}

const RegisterForm: FC<IProps> = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<IFormValues>()
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()

    const save: SubmitHandler<IFormValues> = async (data) => {
       const user=await userService.saveUser(data)
            .catch((error) => alert(`${error.response?.data?.message || error.message}`));
if (user) {
    navigate(`/users/${id}`)
}
        reset()
    }

    return (
        <div className={css.wrap}>
            <div className={css.height}>
        <form onSubmit={handleSubmit(save)} className={css.form}>
            <>
                <input type="hidden" value={+id} {...register('event_id', {valueAsNumber: true, required: true})} />
            </>
            <div>
                <label>Name:</label>
                <input {...register('name', {required: true})} />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" {...register('email', {required: true})} />
                {errors.email && <span>This field is required</span>}
            </div>
            <div>
                <label>Date:</label>
                <input type="date" {...register('date_birth', {required: true})} />
                {errors.date_birth && <span>This field is required</span>}
            </div>
            <div>Where did yoy hear about this event</div>
            <div>
                <label>
                    <input type="radio" value={EWhereHere.social_media} {...register('where_hear', {required: true})} />
                    Social media
                </label>

                <label>
                    <input type="radio" value={EWhereHere.friends} {...register('where_hear', {required: true})} />
                    Friends
                </label>
                <label>
                    <input type="radio" value={EWhereHere.found_myself} {...register('where_hear', {required: true})} />
                    Found myself
                </label>
                {errors.where_hear && <span>This field is required</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
        </div>
    );
};

export {RegisterForm};