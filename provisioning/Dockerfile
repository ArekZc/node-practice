FROM ubuntu

RUN apt-get -y update
RUN apt-get install -y python-yaml python-jinja2 git
RUN git clone http://github.com/ansible/ansible.git /tmp/ansible

WORKDIR /tmp/ansible
ENV PATH /tmp/ansible/bin:/sbin:/usr/sbin:/usr/bin
ENV ANSIBLE_LIBRARY /tmp/ansible/library
ENV PYTHONPATH /tmp/ansible/lib:$PYTHON_PATH

ADD playbooks/ /etc/ansible/
ADD inventory /etc/ansible/hosts
WORKDIR /etc/ansible

CMD ansible-playbook /etc/ansible/playbook.yml -c local
