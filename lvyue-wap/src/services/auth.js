import { supabase } from '../utils/supabase';

// 手机验证码登录
export const loginWithPhone = async (phone, verifyCode) => {
  try {
    // TODO: 实现手机验证码登录
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        data: {
          verifyCode
        }
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('手机验证码登录失败:', error);
    throw error;
  }
};

// 账号密码登录
export const loginWithPassword = async (phone, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('账号密码登录失败:', error);
    throw error;
  }
};

// 获取用户信息
export const getUserInfo = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('未登录');

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// 退出登录
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('退出登录失败:', error);
    throw error;
  }
}; 