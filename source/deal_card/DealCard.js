import React from 'react';
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import InputMask from 'react-input-mask'

import PersonalCard from 'PersonalCard/PersonalCard'

import { allData }  from './data'
import './style.less'

class DealCard extends React.PureComponent {
  
  componentDidMount() {
	this.props.setFieldValue('userNames', allData);
  }

  handleOpenPersonal = () => {
  	const {setFieldValue, values:{isPersonalCardOpen}} = this.props
  	
  	setFieldValue('isPersonalCardOpen', !isPersonalCardOpen)
  }

  successСreationUser = (data) => {
  	const {setFieldValue, values:{isPersonalCardOpen, userNames}} = this.props
  	
  	setFieldValue('isPersonalCardOpen', !isPersonalCardOpen)
  	setFieldValue('userNames', [...userNames, data])
  	setFieldValue('name', data.id);
  } 

  render() {

  	const { 
  		touched,
  		errors,
  		values,
  		isSubmitting,
  		handleBlur,
  		handleChange,
  		setFieldValue
  	} = this.props

  	if (values.isPersonalCardOpen) {
  		return <PersonalCard successСreationUser={this.successСreationUser} />
  	}

    return (
	    <div className='personal-card'>
	      <Form className='personal-card__body'>
			<label>
		    	<span className='label'>Товар</span>
	      		<Field type="radio"
	      		 name='typeName' 
	      		 onClick={() => setFieldValue('typeName', 'Товар')} 
	      		 value='Товар' 
	      		 checked={values.typeName === 'Товар'}/>
  			</label>
			<label>
		    	<span className='label'>Услуга</span>
	      		<Field type="radio"
	      		 name='typeName'
	      		 onClick={() => setFieldValue('typeName', 'Услуга')} 
	      		 value='Услуга'
	      		 checked={values.typeName === 'Услуга'}/>
  			</label>

			<label>
		    	<span className='label'>{values.typeName === 'Товар' ? 'Покупатель' : 'Заказчик'}</span>
	      		<Field type="radio" name='role' value={values.typeName === 'Товар' ? 'Покупатель' : 'Заказчик'} />
  			</label>
			<label>
		    	<span className='label'>{values.typeName === 'Товар' ? 'Продавец' : 'Исполнитель'}</span>
	      		<Field type="radio" name='role' value={values.typeName === 'Товар' ? 'Продавец' : 'Исполнитель'}/>
  			</label>

		    <div className='input'>
		    <label>
		      <span className='label'>Название товара:</span>
		      <Field name="productName" placeholder="Введите название товара"/>
	        </label>
		       { touched.productName && errors.productName && <p className="error">{errors.productName}</p> }
		    </div>
		   	
		    <label>
		    	<span className='label'>Вы будете участвовать в сделке как:</span>
		    	<Field component="select" name="name">
			       <option onClick={() => setFieldValue('name', '')} value=''></option>
			      {
			      	values.userNames.map(({id, name, surname, patronymic}, index) => {
			      		return <option key={index} onClick={() => setFieldValue('name', id)} value={id}>{`${surname} ${name} ${patronymic}`}</option>
			      	})
			      }
			      
    			</Field>
		    </label>
			<button className="button" onClick={this.handleOpenPersonal}>Добавить пользователя</button>
		    <div className='input'>
		    <label>
		      <span className='label'>Описание товара:</span>
		      <Field name="description" placeholder="Введите описание товара"/>
	        </label>
		       { touched.description && errors.description && <p className="error">{errors.description}</p> }
		    </div>
		    <div className="personal-card__footer">
		    	<button className="button" disabled={isSubmitting}>Сохраить</button>
	    	</div>
		  </Form>
	  </div>
    )
  }
}   

const FormikDealCard = withFormik({ 
  mapPropsToValues({ description, productName, typeName, role, name, userNames, isPersonalCardOpen }) {
    return {
      description: description || '',
      productName: productName || '',
      typeName: typeName || 'Товар',
      role: role || '',
      userNames: [],
      name: name || '',
      isPersonalCardOpen: isPersonalCardOpen || false
    }
  },
  validationSchema: Yup.object().shape({
    description: Yup.string(),
    productName: Yup.string().min(2, 'Название должно состоять минимум из 2-x символов')
  }),
  handleSubmit(values, { setSubmitting, resetForm }) {
    setSubmitting(false);
    resetForm();
  }
})(DealCard)

export default FormikDealCard

//.matches(/[\w]+\W[\w]+\W[\w]+/,' ошика ') 