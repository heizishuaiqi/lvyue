// 会议管理相关的 API 服务
import { supabase } from '../config/supabaseClient';

// 获取会议列表
export const getMeetings = async ({ page = 1, pageSize = 10, searchName = '', dateRange = [] }) => {
  try {
    let query = supabase
      .from('meetings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // 添加搜索条件
    if (searchName) {
      query = query.ilike('name', `%${searchName}%`);
    }

    // 添加时间范围筛选
    if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      query = query
        .gte('start_time', dateRange[0])
        .lte('end_time', dateRange[1]);
    }

    // 添加分页
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    query = query.range(start, end);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data,
      total: count,
      page,
      pageSize
    };
  } catch (error) {
    console.error('获取会议列表失败:', error);
    throw error;
  }
};

// 创建会议
export const createMeeting = async (meetingData) => {
  try {
    const { data, error } = await supabase
      .from('meetings')
      .insert([meetingData])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('创建会议失败:', error);
    throw error;
  }
};

// 更新会议
export const updateMeeting = async (id, meetingData) => {
  try {
    const { data, error } = await supabase
      .from('meetings')
      .update(meetingData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('更新会议失败:', error);
    throw error;
  }
};

// 删除会议
export const deleteMeeting = async (id) => {
  try {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('删除会议失败:', error);
    throw error;
  }
};

// 切换会议报名状态
export const toggleMeetingRegistration = async (id, isOpen) => {
  try {
    const { data, error } = await supabase
      .from('meetings')
      .update({ is_registration_open: isOpen })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('切换会议报名状态失败:', error);
 