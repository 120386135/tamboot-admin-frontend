package com.tamboot.admin.system.mapper;

import com.tamboot.mybatis.provider.CommonMapper;

public interface SystemRoleMapper extends CommonMapper<SystemRoleModel, Long> {
    int deleteByRoleCode(String roleCode);
}