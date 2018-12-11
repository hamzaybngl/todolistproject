package util;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Restrictions;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

import entities.Todo;
import entities.Users;

public class Tools {

	public static int getUserId(String username) {
		int userId = 0;
       	SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Users.class).buildSessionFactory();
   		Session session2 = factory.getCurrentSession();
		session2.beginTransaction();
		Criteria userCriteria = session2.createCriteria(Users.class);
		userCriteria.add(Restrictions.eq("username", username));
		List userResult = userCriteria.list(); 
		for(Object userObject : userResult){
			Users user = (Users) userObject;
			userId = user.getUserId();
		}
		return userId;
          
	}
	
	public static Criteria getTodo(int userId) {
		SessionFactory factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Todo.class).buildSessionFactory();
 		Session sessionIndex = factory.getCurrentSession();
 		sessionIndex.beginTransaction();
		Criteria criteria = sessionIndex.createCriteria(Todo.class);
		criteria.add(Restrictions.eq("todoUserFK", userId));
		
		
		return criteria;
		
	}
	
}
