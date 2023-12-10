import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Card, Form, Input, Button } from 'antd';
const { TextArea } = Input;
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import realWorldApiService from '../../utils/realWorldApiSevice';
import './ArticleNew.css';
function ArticleNew() {
  let location = useLocation();
  let titleForm = location.state ? 'Edit Article' : 'Create new article';
  let defValues = {};
  if (location.state) {
    defValues = {
      title: location.state[1],
      description: location.state[2],
      body: location.state[3],
      tags: location.state[4],
    };
  }
  const { user } = useOutletContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [slug, setSlug] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate(`/articles/${slug}`);
      }, 2000);
    }
  }, [successMessage]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: defValues,
  });
  const {
    fields: fieldArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'tags',
  });
  const onSubmit = async (data) => {
    let apiService = new realWorldApiService();
    let response;
    if (location.state) {
      response = await apiService.articleEdit(
        JSON.stringify({
          article: { title: data.title, description: data.description, body: data.body, tagList: data.tags },
        }),
        user.token,
        location.state[0]
      );
    } else {
      response = await apiService.articleNew(
        JSON.stringify({
          article: { title: data.title, description: data.description, body: data.body, tagList: data.tags },
        }),
        user.token
      );
    }
    const responseData = await response.json();
    if (!response.ok) {
      setErrorMessage('Error number is ' + response.status);
      if (responseData.errors) {
        const errors = responseData.errors;
        if (errors.title) {
          setError('title', { type: 'server', message: errors.title });
        } else if (errors.description) {
          setError('description', { type: 'server', message: errors.description });
        } else if (errors.body) {
          setError('body', { type: 'server', message: errors.body });
        }
      }
      return;
    } else {
      setErrorMessage(null);
      setSuccessMessage('Articles was successfull created you will be redirected after 2 seconds');
      setSlug(responseData.article.slug);
    }
  };
  return (
    <div className="sign-up-form">
      <Card className="sign-in-form--width-940">
        <h2 className="sign-up-form__header">{titleForm}</h2>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item label="Title">
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => <Input {...field} placeholder="Title" />}
            />
            {errors.title && <p className="form-error-message">{errors.title.message}</p>}
          </Form.Item>
          <Form.Item label="Short description">
            <Controller
              name="description"
              rules={{ required: 'Description is required' }}
              control={control}
              render={({ field }) => <Input {...field} placeholder="Description" />}
            />
            {errors.description && <p className="form-error-message">{errors.description.message}</p>}
          </Form.Item>
          <Form.Item label="Text">
            <Controller
              name="body"
              rules={{ required: 'Body is required' }}
              control={control}
              render={({ field }) => <TextArea {...field} placeholder="Text" autoSize={{ minRows: 3, maxRows: 5 }} />}
            />
            {errors.body && <p className="form-error-message">{errors.body.message}</p>}
          </Form.Item>
          <Form.List name="tags">
            {(fields, { add, remove: formRemove }, { errors }) => (
              <>
                {fieldArray.map((field, index) => (
                  <Form.Item label={index === 0 ? 'Tags' : ''} required={false} key={field.id}>
                    <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                      <Controller
                        name={`tags[${index}]`}
                        control={control}
                        render={({ field }) => (
                          <Input placeholder="Tag" {...field} style={{ width: '60%', marginRight: '0.5rem' }} />
                        )}
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(index);
                          formRemove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      append();
                      add();
                    }}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add Tag
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button className="sign-up-form__submitBtn" type="primary" htmlType="submit" disabled={isSubmitting}>
              Save
            </Button>
          </Form.Item>
          {errorMessage ? <p className="form-error-message form-message--align-center">{errorMessage}</p> : null}
          {successMessage ? <p className="form-success-message form-message--align-center">{successMessage}</p> : null}
        </Form>
      </Card>
    </div>
  );
}
export default ArticleNew;
