import React from 'react';
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import InputMask from 'react-input-mask'

import './style.less'

class PersonalCard extends React.PureComponent {

  render() {
  	const { 
  		touched,
  		errors,
  		values,
  		isSubmitting,
  		handleBlur,
  		handleChange
  	} = this.props
  	
    return (
	    <div className='personal-card'>
	      <Form className='personal-card__body'>
		    <div className='input'>
		    <label>
		      <span className='label'>Фамилия:</span>
		      <Field name="surname" placeholder="Введите Фамилию"/>
	        </label>
		       { touched.surname && errors.surname && <p className="error">{errors.surname}</p> }
		    </div>
		    <div className='input'>
    		    <label>
		      		<span className='label'>Имя:</span>
		      		<Field type="text" name="name" placeholder="Введите Имя"/>
	      		</label>
		      	{ touched.name && errors.name && <p className="error">{errors.name}</p> }
		    </div>
		    <div className='input'>
    		    <label>	
		      		<span className='label'>Отчество:</span>
		    	    <Field type="text" name="patronymic" placeholder="Введите Отчество"/>
	    	    </label>
		      { touched.patronymic && errors.patronymic && <p className="error">{errors.patronymic}</p> }
		    </div>
		    <div className='input'>
		        <label>	
		      		<span className='label'>Дата рождения:</span>
			        <InputMask onChange={handleChange}
		              onBlur={handleBlur}
		              value={values.date}
		              type="text"
		              name="date" 
		              placeholder="Введите дату рождения"
					  mask="99-99-9999"
		            />
        		</label>
		      { touched.date && errors.date && <p className="error">{errors.date}</p> }
		    </div>
		    <div className="personal-card__footer">
		    	<button className="button" disabled={isSubmitting}>Сохраить пользователя</button>
	    	</div>
		  </Form>
	  </div>
    )
  }
}   

const FormikPersonalCard = withFormik({
  mapPropsToValues({ surname, name, patronymic, date }) {
    return {
      surname: surname || '',
      name: name || '',
      patronymic: patronymic || '',
      date: date || '',
      id: Math.random() * (1 - 999999999999) + 1
    }
  },
  validationSchema: Yup.object().shape({
    surname: Yup.string().min(2, 'Фамилия должна состоять минимум из 2-х символов').matches(/[A-ZА-ЯЁ]+/, 'С заглавной буквы').required('Обязательное поле'),
    name: Yup.string().min(2, 'Имя должно состоять минимум из 2-х символов').matches(/[A-ZА-ЯЁ]+/, 'С заглавной буквы').required('Обязательное поле '),
    patronymic: Yup.string().min(2, 'Отчество должно состоять минимум из 2-х символов').matches(/[A-ZА-ЯЁ]+/, 'С заглавной буквы'),
    date: Yup.string().matches(/(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}/, 'Дата не заполнена')
  }),
  handleSubmit(values, { setSubmitting, resetForm, props }) {
    setSubmitting(false);
    console.log(values);
    resetForm();
    props.successСreationUser(values);
  }
})(PersonalCard)

export default FormikPersonalCard