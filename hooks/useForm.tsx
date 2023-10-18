import React, {useCallback, useState} from 'react';
import {Button} from 'antd';
import {AxiosResponse} from 'axios';
import Link from 'next/link';
import styled from 'styled-components';

type Field<T> = {
  label: string;
  type: 'text' | 'password' | 'textarea' | 'email';
  key: keyof T;
};
type UseFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttonText: string;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    success: (result: any, fromData: T) => void;
  };
  goToSignIn?: boolean;
};

export function useForm<T>(props: UseFormOptions<T>) {
  type Keys = keyof T;

  const {initFormData, fields, submit, buttonText, goToSignIn} = props;

  const [loading, setLoading] = useState(false);
  const [fromData, setFormData] = useState(initFormData);

  const createEmptyError = () => {
    const e: {[k in Keys]?: string[]} = {};
    Object.keys(initFormData).forEach((key) => {
      e[key as Keys] = [];
    });
    return e;
  };

  const [errors, setErrors] = useState(createEmptyError);

  const onChange = useCallback((key: Keys, value: string) => {
    setFormData((state) => ({...state, [key]: value}));
  }, []);

  const _onSubmit = useCallback(
    (e) => {
      setErrors(createEmptyError());
      setLoading(true);
      e.preventDefault();
      submit.request(fromData).then(
        (res) => {
          submit.success(res, fromData);
          setLoading(false);
        },
        (error) => {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors({...response.data});
            setLoading(false);
          }
        }
      );
    },
    [submit, fromData]
  );

  const form = (
    <FormWrapper>
      {fields?.map((filed, index) => {
        return (
          <FormItem key={index}>
            {filed.type === 'textarea' ? (
              <textarea
                className="form-item-input"
                placeholder={filed.label}
                defaultValue={fromData[filed.key].toString()}
                onChange={(e) => {
                  onChange(filed.key, e.target.value);
                }}
              />
            ) : (
              <Input
                name={filed.type}
                type={filed.type}
                className="form-item-input"
                placeholder={filed.label}
                value={fromData[filed.key].toString()}
                onChange={(e) => {
                  onChange(filed.key, e.target.value);
                }}
              />
            )}

            <div className="error">
              {errors[filed.key].length > 0 && errors[filed.key].join(',')}
            </div>
          </FormItem>
        );
      })}
      <div className="submit">
        <Button onClick={_onSubmit} loading={loading}>
          {buttonText}
        </Button>
      </div>
      {goToSignIn && (
        <GoToSignUp>
          <Link href={'/sign_up'} legacyBehavior>
            <a>
              <span>没有账号？</span>立即注册{' '}
            </a>
          </Link>
        </GoToSignUp>
      )}
    </FormWrapper>
  );

  return {form, setErrors};
}

const GoToSignUp = styled.div`
  color: rgba(255, 255, 255);
  span {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Input = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  outline: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  :-webkit-autofill {
    -webkit-text-fill-color: #fff; // 字体颜色
    transition: background-color 50000s ease-in-out 0s; // 50000秒以后再变回它默认的填充色
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 26px;
  .error {
    color: #e76f91;
  }
`;

const FormWrapper = styled.div`
  border-radius: 4px;
  width: 400px;
  height: 400px;
  padding: 16px;
  background: transparent;
  display: flex;
  flex-direction: column;
  color: white;
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
  .submit {
    display: flex;
    margin-bottom: 26px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 16px;
      flex-grow: 1;
      font-size: 16px;
      height: 42px;
      border-radius: 4px;
      border: none;

      &:active {
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
`;
