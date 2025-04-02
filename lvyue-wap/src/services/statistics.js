import { supabase } from '../utils/supabase';

// 获取会议统计数据
export const getMeetingStatistics = async (startDate, endDate) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('未登录');

    // 获取用户角色
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    // 根据用户角色获取不同类型的会议统计
    const { data: registrations, error } = await supabase
      .from('registrations')
      .select(`
        meeting:meetings (
          type
        )
      `)
      .eq('user_id', user.id)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;

    // 统计各类会议次数
    const statistics = {
      executiveCouncil: 0,
      council: 0,
      academic: 0
    };

    registrations.forEach(registration => {
      switch (registration.meeting.type) {
        case '常务理事会议':
          statistics.executiveCouncil++;
          break;
        case '理事会议':
          statistics.council++;
          break;
        case '学术会议':
          statistics.academic++;
          break;
      }
    });

    return statistics;
  } catch (error) {
    console.error('获取会议统计数据失败:', error);
    throw error;
  }
};

// 获取会议详情列表
export const getMeetingList = async (startDate, endDate) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('未登录');

    const { data, error } = await supabase
      .from('registrations')
      .select(`
        id,
        meeting:meetings (
          type,
          name,
          start_time,
          location
        )
      `)
      .eq('user_id', user.id)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 格式化会议数据
    return data.map(item => ({
      id: item.id,
      type: item.meeting.type,
      name: item.meeting.name,
      date: new Date(item.meeting.start_time).toISOString().split('T')[0],
      location: item.meeting.location
    }));
  } catch (error) {
    console.error('获取会议详情列表失败:', error);
    throw error;
  }
}; 