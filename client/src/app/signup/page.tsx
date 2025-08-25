'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, BarChart3, Router } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore'; // 👈 import your zustand store
import { useRouter } from 'next/navigation';

type RegistrationFormKeys = keyof RegistrationFormErrors;

export interface RegistrationFormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
  gender?: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  occupation?: string;
  income?: string;
  terms?: string;
}

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    pan: '',
    aadhaar: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    occupation: '',
    income: 0,
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  // ✅ get signUp + loading from zustand
  const { signUp, loading } = useAuthStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const fieldName = name as RegistrationFormKeys;

    setFormData((prev) => ({
      ...prev,
      [fieldName]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: RegistrationFormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.match(/^[0-9]{10}$/))
      newErrors.mobile = 'Valid 10-digit mobile number required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/))
      newErrors.pan = 'Valid PAN number required (e.g., ABCDE1234F)';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.match(/^[0-9]{6}$/))
      newErrors.pincode = 'Valid 6-digit pincode required';
    if (!formData.termsAccepted)
      newErrors.terms = 'You must accept Terms & Conditions';

    // Check if user is 18+
    if (formData.dob) {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dob = 'You must be 18 or older to register';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // ✅ call zustand signUp
    const result = await signUp(formData);

    if (result.success) {
      // navigate or show message
      console.log('User registered:', result);
      router.push('/');
    } else {
      console.error('Signup failed:', result.error);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all';
  const errorClass = 'text-red-400 text-sm mt-1';

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <div className='bg-cyan-400 p-2 rounded-lg mr-3'>
              <BarChart3 className='w-6 h-6 text-slate-900' />
            </div>
            <h1 className='text-2xl font-bold text-white'>FinanceAI</h1>
          </div>
          <h2 className='text-xl font-semibold text-white mb-2'>
            Create Your Account
          </h2>
          <p className='text-slate-400'>Join thousands of smart investors</p>
        </div>

        {/* form content stays the same ... */}
        <div className='space-y-6'>
          {' '}
          {/* Personal Information */}{' '}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Full Name *{' '}
              </label>{' '}
              <input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Enter your full name'
                className={inputClass}
              />{' '}
              {errors.fullName && (
                <p className={errorClass}>{errors.fullName}</p>
              )}{' '}
            </div>{' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Gender *{' '}
              </label>{' '}
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
              >
                {' '}
                <option value=''>Select Gender</option>{' '}
                <option value='male'>Male</option>{' '}
                <option value='female'>Female</option>{' '}
                <option value='other'>Other</option>{' '}
              </select>{' '}
              {errors.gender && <p className={errorClass}>{errors.gender}</p>}{' '}
            </div>{' '}
          </div>{' '}
          {/* Contact Information */}{' '}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Email Address *{' '}
              </label>{' '}
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className={inputClass}
              />{' '}
              {errors.email && <p className={errorClass}>{errors.email}</p>}{' '}
            </div>{' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Mobile Number *{' '}
              </label>{' '}
              <input
                type='tel'
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                placeholder='10-digit mobile number'
                maxLength={10}
                className={inputClass}
              />{' '}
              {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}{' '}
            </div>{' '}
          </div>{' '}
          {/* Date of Birth */}{' '}
          <div>
            {' '}
            <label className='block text-slate-300 text-sm font-medium mb-2'>
              {' '}
              Date of Birth * (Must be 18+){' '}
            </label>{' '}
            <input
              type='date'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              className={inputClass}
            />{' '}
            {errors.dob && <p className={errorClass}>{errors.dob}</p>}{' '}
          </div>{' '}
          {/* Financial Information */}{' '}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                PAN Number *{' '}
              </label>{' '}
              <input
                type='text'
                name='pan'
                value={formData.pan.toUpperCase()}
                onChange={handleChange}
                placeholder='ABCDE1234F'
                maxLength={10}
                className={inputClass}
              />{' '}
              {errors.pan && <p className={errorClass}>{errors.pan}</p>}{' '}
            </div>{' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Aadhaar Number (Optional){' '}
              </label>{' '}
              <input
                type='text'
                name='aadhaar'
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder='12-digit Aadhaar number'
                maxLength={12}
                className={inputClass}
              />{' '}
            </div>{' '}
          </div>{' '}
          {/* Address */}{' '}
          <div>
            {' '}
            <label className='block text-slate-300 text-sm font-medium mb-2'>
              {' '}
              Residential Address *{' '}
            </label>{' '}
            <textarea
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Enter your complete address'
              rows={3}
              className={inputClass}
            />{' '}
            {errors.address && <p className={errorClass}>{errors.address}</p>}{' '}
          </div>{' '}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                City *{' '}
              </label>{' '}
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='City'
                className={inputClass}
              />{' '}
              {errors.city && <p className={errorClass}>{errors.city}</p>}{' '}
            </div>{' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                State *{' '}
              </label>{' '}
              <input
                type='text'
                name='state'
                value={formData.state}
                onChange={handleChange}
                placeholder='State'
                className={inputClass}
              />{' '}
              {errors.state && <p className={errorClass}>{errors.state}</p>}{' '}
            </div>{' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Pincode *{' '}
              </label>{' '}
              <input
                type='text'
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
                placeholder='6-digit pincode'
                maxLength={6}
                className={inputClass}
              />{' '}
              {errors.pincode && <p className={errorClass}>{errors.pincode}</p>}{' '}
            </div>{' '}
          </div>{' '}
          {/* Optional Fields */}{' '}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Occupation (Optional){' '}
              </label>{' '}
              <input
                type='text'
                name='occupation'
                value={formData.occupation}
                onChange={handleChange}
                placeholder='Your occupation'
                className={inputClass}
              />{' '}
            </div>{' '}
            <div>
              {' '}
              {/* <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Annual Income (Optional){' '}
              </label>{' '}
              <select
                name='income'
                value={formData.income}
                onChange={handleChange}
                className={inputClass}
              >
                {' '}
                <option value=''>Select Income Range</option>{' '}
                <option value='below-2'>Below ₹2 Lakh</option>{' '}
                <option value='2-5'>₹2-5 Lakh</option>{' '}
                <option value='5-10'>₹5-10 Lakh</option>{' '}
                <option value='10-25'>₹10-25 Lakh</option>{' '}
                <option value='above-25'>Above ₹25 Lakh</option>{' '}
              </select>{' '} */}
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Annual Income (Optional)
              </label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={(e) =>
                  setFormData({ ...formData, income: Number(e.target.value) })
                }
                className={inputClass}
                placeholder="Enter your annual income"
              />

            </div>{' '}
          </div>{' '}
          {/* Password */}{' '}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Password *{' '}
              </label>{' '}
              <div className='relative'>
                {' '}
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Create a strong password'
                  className={inputClass + ' pr-12'}
                />{' '}
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300'
                >
                  {' '}
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}{' '}
                </button>{' '}
              </div>{' '}
              {errors.password && (
                <p className={errorClass}>{errors.password}</p>
              )}{' '}
            </div>{' '}
            <div>
              {' '}
              <label className='block text-slate-300 text-sm font-medium mb-2'>
                {' '}
                Confirm Password *{' '}
              </label>{' '}
              <div className='relative'>
                {' '}
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm your password'
                  className={inputClass + ' pr-12'}
                />{' '}
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300'
                >
                  {' '}
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}{' '}
                </button>{' '}
              </div>{' '}
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword}</p>
              )}{' '}
            </div>{' '}
          </div>{' '}
          {/* Terms and Conditions */}{' '}
          <div className='flex items-start space-x-3'>
            {' '}
            <input
              type='checkbox'
              name='termsAccepted'
              checked={formData.termsAccepted}
              onChange={handleChange}
              className='mt-1 w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400 focus:ring-2'
            />{' '}
            <label className='text-slate-300 text-sm leading-relaxed'>
              {' '}
              I agree to the{' '}
              <a
                href='#'
                className='text-cyan-400 hover:text-cyan-300 underline'
              >
                {' '}
                Terms & Conditions{' '}
              </a>{' '}
              and{' '}
              <a
                href='#'
                className='text-cyan-400 hover:text-cyan-300 underline'
              >
                {' '}
                Privacy Policy{' '}
              </a>{' '}
            </label>{' '}
          </div>{' '}
          {errors.terms && <p className={errorClass}>{errors.terms}</p>}
          {/* Submit Button */}
          <button
            type='button'
            onClick={handleSubmit}
            disabled={loading}
            className='w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50'
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          {/* Login Link */}
          <div className='text-center pt-4 border-t border-slate-700/50'>
            <p className='text-slate-400'>
              Already have an account?{' '}
              <a
                href='#'
                className='text-cyan-400 hover:text-cyan-300 font-medium'
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
