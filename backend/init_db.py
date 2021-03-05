from models.role import RoleModel

def init_defaults():
    if RoleModel.query.first() is None:
        roles = ['admin', 'user', 'owner']
        for role in roles:
            roleToSave = RoleModel(role)
            roleToSave.save_to_db()
    pass
